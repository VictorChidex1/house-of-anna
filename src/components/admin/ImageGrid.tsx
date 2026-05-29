import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { GalleryItem, GalleryCategory } from "../../types";
import Spinner from "../ui/Spinner";

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Bespoke Gowns", value: "bespoke-gowns" },
  { label: "Blazers", value: "blazers" },
  { label: "Ankara", value: "ankara" },
  { label: "Corporate", value: "corporate" },
  { label: "Bridal & Wedding Gown", value: "bridal-wedding" },
];

/* ── Edit Modal ────────────────────────────────────────────────────── */
interface EditModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || "");
  const [category, setCategory] = useState<GalleryCategory>(item.category);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [featured, setFeatured] = useState(item.featured);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !category) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, "gallery", item.id), {
        title: title.trim(),
        description: description.trim(),
        category,
        imageUrl,
        thumbnailUrl: imageUrl,
        featured,
      });
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white border border-brand-gold/20 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/10">
          <h3 className="text-xs tracking-[0.25em] uppercase text-brand-dark font-medium">
            Edit Gallery Item
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-brand-gray hover:text-brand-dark transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Image Preview + URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <div className="flex items-center justify-center">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-28 object-contain border border-brand-gold/10"
                />
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold resize-none transition-colors"
            />
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                featured ? "bg-brand-gold" : "bg-brand-gold/20"
              }`}
              onClick={() => setFeatured(!featured)}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase text-brand-gray group-hover:text-brand-dark transition-colors">
              Featured
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-brand-gold/10">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-[10px] tracking-widest uppercase border border-brand-gold/30 text-brand-gray hover:text-brand-dark hover:border-brand-gold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !category}
            className="flex-1 py-2.5 text-[10px] tracking-widest uppercase bg-brand-navy text-white hover:bg-brand-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Image Grid ────────────────────────────────────────────────────── */
const ImageGrid: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryItem));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, "gallery", id));
  };

  if (loading) return <Spinner />;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-brand-gray text-sm">
        No images uploaded yet. Use the form above to add your first piece.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative border border-brand-gold/10 overflow-hidden">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3">
              <p className="text-white text-xs text-center font-medium mb-1 leading-tight">
                {item.title}
              </p>
              <span className="text-[10px] tracking-widest uppercase text-brand-gold mb-3">
                {CATEGORIES.find((c) => c.value === item.category)?.label || item.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditItem(item)}
                  className="px-3 py-1 text-[10px] tracking-widest uppercase border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="px-3 py-1 text-[10px] tracking-widest uppercase border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <EditModal item={editItem} onClose={() => setEditItem(null)} />
      )}
    </>
  );
};

export default ImageGrid;
