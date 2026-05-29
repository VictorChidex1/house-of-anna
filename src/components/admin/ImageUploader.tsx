import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadImage, generateThumbnail } from "../../services/storage";
import type { GalleryCategory } from "../../types";

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Bespoke Gowns", value: "bespoke-gowns" },
  { label: "Blazers", value: "blazers" },
  { label: "Ankara", value: "ankara" },
  { label: "Corporate", value: "corporate" },
  { label: "Bridal & Wedding Gown", value: "bridal-wedding" },
];

const ImageUploader: React.FC = () => {
  const [tab, setTab] = useState<"url" | "file">("url");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState<GalleryCategory | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const reset = () => {
    setUrl("");
    setFile(null);
    setPreview("");
    setCategory("");
    setTitle("");
    setDescription("");
    setProgress(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!category || !title) return;

    setUploading(true);
    try {
      let imageUrl: string;
      let thumbnailUrl: string;

      if (tab === "url") {
        if (!url) return;
        imageUrl = url;
        thumbnailUrl = url;
      } else {
        if (!file) return;
        imageUrl = await uploadImage(file, setProgress);
        const thumbBlob = await generateThumbnail(file);
        const thumbFile = new File([thumbBlob], `thumb_${file.name}`, { type: "image/webp" });
        thumbnailUrl = await uploadImage(thumbFile);
      }

      await addDoc(collection(db, "gallery"), {
        imageUrl,
        thumbnailUrl,
        category,
        title,
        description,
        featured: false,
        createdAt: serverTimestamp(),
      });

      reset();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-brand-gold/10 p-6">
      <div className="flex gap-4 mb-6 border-b border-brand-gold/10 pb-4">
        <button
          onClick={() => setTab("url")}
          className={`text-xs tracking-widest uppercase pb-2 transition-colors ${
            tab === "url"
              ? "text-brand-gold border-b-2 border-brand-gold"
              : "text-brand-gray hover:text-brand-dark"
          }`}
        >
          Paste URL
        </button>
        <button
          onClick={() => setTab("file")}
          className={`text-xs tracking-widest uppercase pb-2 transition-colors ${
            tab === "file"
              ? "text-brand-gold border-b-2 border-brand-gold"
              : "text-brand-gray hover:text-brand-dark"
          }`}
        >
          Upload from Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {tab === "url" ? (
            <div>
              <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setPreview(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full text-sm text-brand-gray file:mr-3 file:py-2 file:px-4 file:border file:border-brand-gold/20 file:text-xs file:tracking-widest file:uppercase file:bg-transparent file:text-brand-dark hover:file:border-brand-gold"
              />
            </div>
          )}

          {tab === "file" && uploading && (
            <div>
              <div className="w-full h-1.5 bg-brand-gold/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gold transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-brand-gray mt-1">{progress}%</p>
            </div>
          )}

          <div>
            <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The 'Moremi' Crimson Blazer Set"
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of the design..."
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading || !category || !title || (tab === "url" && !url) || (tab === "file" && !file)}
            className="w-full py-3 bg-brand-navy text-white text-xs tracking-widest uppercase hover:bg-brand-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? "Uploading..." : "Add to Gallery"}
          </button>
        </div>

        {preview && (
          <div className="flex items-start justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 object-contain border border-brand-gold/10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
