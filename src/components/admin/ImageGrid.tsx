import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { GalleryItem } from "../../types";
import Spinner from "../ui/Spinner";

const ImageGrid: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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
              {item.category}
            </span>
            <button
              onClick={() => handleDelete(item.id, item.title)}
              className="px-3 py-1 text-[10px] tracking-widest uppercase border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
