# Admin Dashboard — Complete Architecture

## Table of Contents

1. Route Architecture
2. Auth Flow
3. Login Page
4. Admin Layout (Sidebar)
5. Dual Upload System
6. Storage Service
7. Gallery Management
8. Inquiry Management
9. App.tsx Wiring

---

## 1. Route Architecture

Admin routes are **lazy-loaded** using `React.lazy()` + `Suspense`. This means the admin code is only downloaded when the user visits `/admin/*`, keeping the initial bundle small for visitors browsing the portfolio.

```
/admin/login           → AdminLoginPage   (1.94 kB chunk)
/admin                 → AdminDashboardPage (7.18 kB chunk)
/admin/inquiries       → AdminInquiriesPage (5.11 kB chunk)
```

Unlike public routes (which use `AppLayout` with Navbar + Footer), admin routes use a **separate `AdminLayout`** with its own sidebar navigation. This is why they are defined as a separate `<Route>` block in `App.tsx`.

```tsx
// Public routes — wrapped in AppLayout (navbar + footer)
<Route element={<AppLayout />}>
  <Route path="portfolio" element={<PortfolioPage />} />
  {/* ... */}
</Route>

// Admin routes — wrapped in AdminLayout (sidebar)
<Route path="/admin" element={...}>
  <Route index element={<AdminDashboardPage />} />
  <Route path="inquiries" element={<AdminInquiriesPage />} />
</Route>

// Admin login — standalone (no sidebar)
<Route path="/admin/login" element={...} />
```

The `Suspense` wrapper shows a `Spinner` while each lazy chunk loads:

```tsx
const AdminSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Spinner className="min-h-screen" />}>{children}</Suspense>
);
```

---

## 2. Auth Flow

### File: `src/contexts/AdminContext.tsx`

This file creates a React Context that manages Firebase Authentication state for the admin area.

```tsx
export interface AdminContextValue {
  user: User | null;       // Firebase user object (null when logged out)
  loading: boolean;        // True while checking auth state on page load
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextValue | null>(null);
```

### The `AdminProvider` component:

1. **Initializes auth listener** — Sets up `onAuthStateChanged` in a `useEffect` to listen for auth state changes. This fires once on mount and whenever auth state changes (login/logout).

2. **Provides login/logout** — Uses Firebase's `signInWithEmailAndPassword` and `signOut` directly.

3. **Loading state** — While the initial auth check is happening (`loading = true`), the `AdminLayout` renders a `Spinner` so there's no flash of the login page.

```tsx
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false); // Done checking
  });
  return unsub;
}, []);
```

### File: `src/hooks/useAdmin.ts`

A separate hook file (separated to avoid a react-refresh lint warning about mixed exports):

```tsx
export const useAdmin = (): AdminContextValue => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
```

### Protection in `AdminLayout.tsx`:

```tsx
if (loading) return <Spinner className="min-h-screen" />;
if (!user) return <Navigate to="/admin/login" replace />;
```

If there's no authenticated user, the admin pages **never render** — the user is redirected to the login page.

---

## 3. Login Page

### File: `src/pages/AdminLoginPage.tsx`

A simple centered form with email + password fields. It uses `useAdmin()` to call `login()`.

```tsx
const { user, loading, login } = useAdmin();

// Already logged in? Redirect to dashboard
if (user) return <Navigate to="/admin" replace />;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    await login(email, password);
  } catch {
    setError("Invalid email or password.");
  }
};
```

**Key details:**
- No "Register" or "Create Account" — accounts are created manually in Firebase Console.
- Error message is generic ("Invalid email or password") for security — doesn't reveal whether the email exists.
- Redirects to `/admin` on success automatically because `onAuthStateChanged` fires and the `AdminLayout` re-renders.

---

## 4. Admin Layout (Sidebar)

### File: `src/components/layout/AdminLayout.tsx`

**Layout structure:**

```
┌──────────┬─────────────────────────────────────┐
│  SIDEBAR │  TOP BAR (sticky)                    │
│  (fixed) │  "Welcome, admin@email.com"   Logout │
│          ├─────────────────────────────────────┤
│ ● Dash   │                                     │
│ ● Inq    │  <Outlet /> (page content)           │
│          │                                     │
│ ● Logout │                                     │
└──────────┴─────────────────────────────────────┘
```

### Sidebar behavior:

- **Desktop**: Always visible, fixed on the left (250px wide).
- **Mobile**: Hidden by default (`-translate-x-full`). Toggled via hamburger button in the top bar. An overlay (`bg-black/40`) closes it when tapped.
- **Active link**: Highlighted with `bg-brand-gold/15` and a gold left border when `pathname === item.to`.
- **Logout**: Calls `logout()` from `useAdmin()`.

```tsx
<aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-brand-navy text-white transform transition-transform duration-300 lg:translate-x-0 ${
  sidebarOpen ? "translate-x-0" : "-translate-x-full"
}`}>
```

The `Outlet` component renders the matched child route (`AdminDashboardPage` or `AdminInquiriesPage`).

---

## 5. Dual Upload System

### File: `src/components/admin/ImageUploader.tsx`

The uploader has **two tabs** to accommodate both the Firebase Spark free plan and the Blaze paid plan.

### Tab 1: "Paste URL" (Spark Plan — Free)

```
User pastes URL → Preview loads → Select category + title + description → Submit
                                                                              ↓
                                                         Firestore document created:
                                                         { imageUrl: url, thumbnailUrl: url, category, title, ... }
```

No Firebase Storage is used. The image URL is stored directly in Firestore. The portfolio page uses this URL to display the image.

### Tab 2: "Upload from Device" (Blaze Plan — Paid)

```
User picks file → Local preview shows → Select category + title + description → Submit
                                                                                ↓
                                        1. Upload original to Firebase Storage → get download URL
                                        2. Generate 200px webp thumbnail client-side → upload to Storage → get thumbnail URL
                                        3. Write both URLs + metadata to Firestore
```

**Progress bar:** The `uploadBytesResumable` function from Firebase fires `state_changed` events with `bytesTransferred / totalBytes`, which we convert to a percentage and display as a colored bar.

**Form validation:** The submit button is disabled until:
- Category is selected
- Title is filled
- Either a URL is pasted (URL tab) or a file is chosen (File tab)

**Category dropdown:** A `<select>` element populated with the 5 categories (Crepe, Vintage, Silk, Ankara, Corporate).

### State management:

```tsx
const [tab, setTab] = useState<"url" | "file">("url");
const [url, setUrl] = useState("");
const [file, setFile] = useState<File | null>(null);
const [preview, setPreview] = useState("");
const [category, setCategory] = useState<GalleryCategory | "">("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [progress, setProgress] = useState(0);
const [uploading, setUploading] = useState(false);
```

After successful submission, `reset()` clears all fields.

---

## 6. Storage Service

### File: `src/services/storage.ts`

Two utility functions:

### `uploadImage(file, onProgress)` → Returns download URL

```tsx
export function uploadImage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  // Creates a reference: gallery/{timestamp}_{filename}
  // Uses uploadBytesResumable for progress tracking
  // Returns the download URL after upload completes
}
```

**Storage path:** `gallery/{timestamp}_{filename}` — the timestamp ensures unique filenames even if two images have the same name.

### `generateThumbnail(file, maxWidth=200)` → Returns webp Blob

```tsx
export async function generateThumbnail(file: File, maxWidth = 200): Promise<Blob> {
  // 1. Decode the image using createImageBitmap (browser-native, no library needed)
  // 2. Calculate new dimensions preserving aspect ratio (maxWidth = 200px)
  // 3. Draw to OffscreenCanvas at the new size
  // 4. Export as webp with 70% quality using canvas.convertToBlob()
  // 5. Return the blob (which can be uploaded as a File)
}
```

This thumbnail is uploaded separately to Firebase Storage (using `uploadImage` again) and its URL is stored in the `thumbnailUrl` field of the gallery item.

**Why 200px webp?** The CONTEXT.md performance requirements specify thumbnails max 200px width in webp format. This keeps gallery load times fast even on slow connections.

---

## 7. Gallery Management

### File: `src/components/admin/ImageGrid.tsx`

**Real-time updates:** Uses `onSnapshot` on the Firestore `gallery` collection (ordered by `createdAt desc`). Any changes in Firestore (new uploads, deletions) reflect instantly without page refresh.

```tsx
useEffect(() => {
  const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
  const unsub = onSnapshot(q, (snap) => {
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryItem));
    setLoading(false);
  });
  return unsub;
}, []);
```

**Display:** Responsive grid (2→3→4 columns). Each card shows:
- Thumbnail image
- On hover: dark overlay with title, category label, and a **Delete** button

**Delete flow:**
```tsx
const handleDelete = async (id: string, title: string) => {
  if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
  await deleteDoc(doc(db, "gallery", id));
};
```

A confirmation dialog prevents accidental deletion. After deletion, Firestore triggers the `onSnapshot` listener and the item disappears from the grid in real-time.

**Empty state:** If no items exist, shows a helpful message: *"No images uploaded yet. Use the form above to add your first piece."*

---

## 8. Inquiry Management

### File: `src/hooks/useInquiries.ts`

```tsx
export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener sorted by createdAt descending
  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => { ... });
    return unsub;
  }, []);

  // Update inquiry status
  const updateStatus = async (id: string, status: InquiryStatus) => {
    await updateDoc(doc(db, "inquiries", id), { status });
  };

  return { inquiries, loading, updateStatus };
}
```

**Note:** Inquiries are created by the public contact form (`collection(db, "inquiries")` with `addDoc`). They are NOT created in the admin dashboard. The admin dashboard only **reads** and **updates** statuses.

### File: `src/components/admin/InquiryList.tsx`

**Row structure:**
```
┌──────────────────────────────────────────────────────────────┐
│  Name              Email            Status     Date     ▼    │
├──────────────────────────────────────────────────────────────┤
│  (expanded)                                                  │
│  Email: user@example.com    Phone: +234...                   │
│  Service: Bespoke Gowns     Budget: ₦150,000 — ₦500,000     │
│  Event Date: 15 Dec 2026    Status: [new ▼]                  │
│                                                              │
│  Message: "I'd like a custom bridal gown..."                 │
└──────────────────────────────────────────────────────────────┘
```

- **Collapsed view:** Shows name, email (desktop only), status badge, and date on one line.
- **Click to expand:** Uses `AnimatePresence` + `motion.div` with height animation for smooth open/close.
- **Expanded view:** Shows all inquiry fields in a 2-column grid + the full message.
- **Status dropdown:** A `<select>` element in the expanded view calls `onUpdateStatus(id, newStatus)`.

### File: `src/components/admin/StatusBadge.tsx`

Color-coded badges for each status:

| Status    | Style |
|-----------|-------|
| `new`     | Gold text on gold-tinted background |
| `contacted` | Blue text on blue-tinted background |
| `booked`  | Green text on green-tinted background |

### File: `src/pages/AdminInquiriesPage.tsx`

- Displays total inquiry count.
- Includes a **search bar** (`FaSearch` icon) that filters by name, email, or service type using `useMemo`.
- Passes filtered list and `updateStatus` to `InquiryList`.

```tsx
const filtered = useMemo(() => {
  if (!search.trim()) return inquiries;
  const q = search.toLowerCase();
  return inquiries.filter(
    (i) => i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.serviceType.toLowerCase().includes(q),
  );
}, [inquiries, search]);
```

---

## 9. App.tsx Wiring

### File: `src/App.tsx`

The main application file wires everything together.

```tsx
// Lazy-load admin components (code-split)
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminInquiriesPage = lazy(() => import("./pages/AdminInquiriesPage"));

// Suspense wrapper for loading state
const AdminSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Spinner className="min-h-screen" />}>{children}</Suspense>
);

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes with AppLayout (navbar + footer) */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        {/* ... */}
      </Route>

      {/* Admin routes with AdminLayout (sidebar) + AdminProvider */}
      <Route
        path="/admin"
        element={
          <AdminSuspense>
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          </AdminSuspense>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
      </Route>

      {/* Admin login (standalone, no sidebar) */}
      <Route
        path="/admin/login"
        element={
          <AdminSuspense>
            <AdminProvider>
              <AdminLoginPage />
            </AdminProvider>
          </AdminSuspense>
        }
      />
    </Routes>
  );
};
```

**Key points:**
- `AdminProvider` wraps all admin routes so they share auth state.
- `AdminLayout` handles protection (redirects to login if unauthenticated).
- `AdminSuspense` shows a spinner while the lazy-loaded chunk downloads.
- Public routes and admin routes are in separate `<Route>` blocks because they use different layouts.

---

## Data Flow Diagram

```
                   PUBLIC                          ADMIN
                   ──────                          ─────
                                                        ┌─────────────────┐
                   ┌──────────────┐                     │  Login Page     │
                   │  Contact     │                     │  /admin/login   │
                   │  Form        │                     └───────┬─────────┘
                   └──────┬───────┘                             │
                          │                                     ▼
                          ▼                              ┌─────────────────┐
                   ┌──────────────┐                     │  AdminLayout    │
                   │  Firestore   │                     │  (protected)    │
                   │  inquiries   │                     └───────┬─────────┘
                   │  collection  │                             │
                   └──────┬───────┘                     ┌───────┴─────────┐
                          │                             │                 │
                          │ onSnapshot                  ▼                 ▼
                          ▼                     ┌──────────────┐  ┌──────────────┐
                   ┌──────────────┐             │  Dashboard   │  │  Inquiries   │
                   │  InquiryList │             │  /admin      │  │  /admin/     │
                   │  (admin)     │             │              │  │  inquiries   │
                   └──────────────┘             │ Upload Form  │  │              │
                                                │   Tab 1:     │  │ List +       │
                                                │   Paste URL  │  │ Update       │
                                                │   Tab 2:     │  │ Status       │
                   ┌──────────────┐             │   Upload     │  └──────────────┘
                   │  Portfolio   │             │              │
                   │  Page        │             │ Image Grid   │
                   │  (public)    │             │ (manage +    │
                   └──────────────┘             │  delete)     │
                          ▲                     └──────┬───────┘
                          │                            │
                          │ onSnapshot                  │
                          ▼                            ▼
                   ┌────────────────────────────────────────────┐
                   │           Firestore "gallery" collection    │
                   │  { imageUrl, thumbnailUrl, category, ... }  │
                   └────────────────────────────────────────────┘
```

---

## Complete File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `src/contexts/AdminContext.tsx` | ~50 | Auth context provider |
| `src/hooks/useAdmin.ts` | ~10 | Auth hook |
| `src/hooks/useInquiries.ts` | ~35 | Firestore inquiry read/update |
| `src/services/storage.ts` | ~40 | Firebase Storage upload + thumbnail |
| `src/components/ui/Spinner.tsx` | ~12 | Loading spinner |
| `src/components/layout/AdminLayout.tsx` | ~85 | Protected sidebar layout |
| `src/components/admin/StatusBadge.tsx` | ~20 | Colored status pill |
| `src/components/admin/ImageUploader.tsx` | ~170 | Dual-tab upload form |
| `src/components/admin/ImageGrid.tsx` | ~60 | Gallery management grid |
| `src/components/admin/InquiryList.tsx` | ~105 | Expandable inquiry rows |
| `src/pages/AdminLoginPage.tsx` | ~65 | Login form |
| `src/pages/AdminDashboardPage.tsx` | ~20 | Dashboard page |
| `src/pages/AdminInquiriesPage.tsx` | ~40 | Inquiries page with search |
| `src/App.tsx` | — | Route wiring |
