import { db } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface gameType {
  userId?: string;
  postId?: string;
  category?: string;
  topic?: string;
  title?: string;
  totalQuiz?: string;
  date?: string;
}

export const getGameData = async (gameId: string) => {
  const docRef = doc(db, 'Games', gameId);
  const docSnap = (await getDoc(docRef)).data();
  function generateRandomOrder(length: number) {
    const order = Array.from({ length }, (_, index) => index);
    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  // 객체 배열을 랜덤하게 섞는 함수
  function shuffleObjects(objectArray: any) {
    const order = generateRandomOrder(objectArray.length);
    const shuffledArray = order.map(index => objectArray[index]);
    return shuffledArray;
  }

  // 객체 배열을 랜덤하게 섞은 결과
  const shuffledArray = shuffleObjects(docSnap?.quiz);

  return shuffledArray;
};
