import { db } from 'config/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export interface gameType {
  userId?: string;
  postId?: string;
  category?: string;
  topic?: string;
  title?: string;
  totalQuiz?: string;
  date?: string;
}

export const getMadeGames = async (userId: string) => {
  const q = query(collection(db, 'GameLists'), where('userId', '==', userId));
  const games: gameType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    games.push({ postId: doc.id, ...doc.data() });
  });

  return games;
};

export const getLikedGamesId = async (userId: string) => {
  const q = query(collection(db, 'GameLikes'), where('likeUsers', 'array-contains-any', [userId]));
  const games: gameType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    games.push({ postId: doc.id });
  });

  return games;
};

export const getLikedGames = async (gamesId: gameType[]) => {
  const games: gameType[] = [];
  if (gamesId !== undefined) {
    for (const gameId of gamesId) {
      const docRef = doc(db, 'GameLists', gameId.postId as string);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const gameData = docSnapshot.data();
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (gameData) {
          games.push({ postId: docSnapshot.id, ...gameData });
        }
      }
    }
  }
  return games;
};
