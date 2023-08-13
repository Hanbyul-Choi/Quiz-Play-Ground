import { db } from 'config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { type GameListContent } from 'pages';

export const getGameLists = async () => {
  const q = query(collection(db, 'GameLists'), orderBy('date', 'desc'));
  // const querySnapshot = await getDocs(collection(db, 'GameLists'), orderBy('date','desc'));
  const querySnapshot = await getDocs(q);
  const data: GameListContent[] = [];

  querySnapshot.forEach(doc => {
    const content: GameListContent = {
      postId: doc.id,
      category: '',
      date: '',
      title: '',
      totalQuiz: 0,
      userId: '',
      userName: '',
      topic: null,
      ...doc.data()
    };
    data.push(content);
  });
  return data;
};
