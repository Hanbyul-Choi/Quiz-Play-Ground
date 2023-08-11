import { db } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface gameType {
  userId?: string;
  postId?: string;
  category?: string;
  topic?: string;
  title?: string;
  totalQuiz?: string;
  date?: string;
}

export const getMyGames = async () => {
  const userId = sessionStorage.getItem('userId');
  const q = query(collection(db, 'GameLists'), where('userId', '==', userId));
  const games: gameType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    games.push({ postId: doc.id, ...doc.data() });
  });

  return games;
};
