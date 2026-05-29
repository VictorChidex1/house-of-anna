export type GalleryCategory =
  | "bespoke-gowns"
  | "blazers"
  | "ankara"
  | "corporate"
  | "bridal-wedding";

export type InquiryStatus = "new" | "contacted" | "booked";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: GalleryCategory;
  title: string;
  description: string;
  featured: boolean;
  createdAt: Timestamp;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budgetRange: string;
  eventDate?: Timestamp;
  message: string;
  imageRef?: string;
  status: InquiryStatus;
  createdAt: Timestamp;
}

export interface Settings {
  heroImageUrl: string;
  aboutText: string;
  aboutImageUrl: string;
  contactPhone: string;
  instagramHandle: string;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
  toDate(): Date;
}
