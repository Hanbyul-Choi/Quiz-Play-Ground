import { type LikeDoc } from 'components/gamelist/GameInfo';
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getGameLikes = async () => {
  const querySnapshot = await getDocs(collection(db, 'GameLikes'));
  const data: LikeDoc[] = [];

  querySnapshot.forEach(doc => {
    const content: LikeDoc = {
      postId: doc.id,
      likeUsers: [],
      ...doc.data()
    };
    data.push(content);
  });
  return data;
};
