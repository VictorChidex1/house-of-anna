import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Subscriber {
  id: string;
  email: string;
  createdAt: Timestamp;
}

export function useSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "subscribers"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setSubscribers(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Subscriber))
      );
      setLoading(false);
    });
    return unsub;
  }, []);

  return { subscribers, loading };
}
