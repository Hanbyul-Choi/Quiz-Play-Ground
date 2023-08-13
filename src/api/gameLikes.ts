import { type LikeDoc } from 'components/gamelist/GameInfo';
import { db } from 'config/firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

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

export const clickLike = async (postId: string, userId: string) => {
  const docRef = doc(db, 'GameLikes', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let likeDoc = docSnap.data().likeUsers;
    if (likeDoc.includes(userId) as boolean) {
      likeDoc = likeDoc.filter((id: string) => id !== userId);
    } else {
      likeDoc.push(userId);
    }
    await updateDoc(docRef, { likeUsers: likeDoc });
  } else {
    const likeDoc = { likeUsers: [userId] };
    await setDoc(docRef, likeDoc);
  }
};
