import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Inquiry, InquiryStatus } from "../types";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items: Inquiry[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry));
      setInquiries(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    await updateDoc(doc(db, "inquiries", id), { status });
  };

  return { inquiries, loading, updateStatus };
}
