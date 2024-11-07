import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, startAfter, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Stage } from '../types';

export const useStages = (filterType: 'all' | 'my' | 'popular' | 'new', pageSize = 5) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const getStages = async (isInitial = false) => {
    try {
      let q = collection(db, 'stages');
      
      switch (filterType) {
        case 'popular':
          q = query(q, orderBy('likes', 'desc'));
          break;
        case 'new':
          q = query(q, orderBy('createdAt', 'desc'));
          break;
        default:
          q = query(q, orderBy('createdAt', 'desc'));
      }

      if (!isInitial && lastDoc) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      } else {
        q = query(q, limit(pageSize));
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      const newStages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Stage[];

      setHasMore(newStages.length === pageSize);
      
      if (isInitial) {
        setStages(newStages);
      } else {
        setStages(prev => [...prev, ...newStages]);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStages([]);
    setLastDoc(null);
    setHasMore(true);
    getStages(true);
  }, [filterType]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    getStages();
  };

  return { stages, loading, hasMore, loadMore };
};