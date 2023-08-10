import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { type GameListContent } from 'pages';

export const getGameLists = async () => {
  const querySnapshot = await getDocs(collection(db, 'GameLists'));
  const data: GameListContent[] = [];

  querySnapshot.forEach(doc => {
    const content: GameListContent = {
      postId: doc.id,
      category: '',
      date: 0,
      title: '',
      totalQuiz: 0,
      userId: '',
      topic: null,
      ...doc.data()
    };
    data.push(content);
  });
  return data;
};
