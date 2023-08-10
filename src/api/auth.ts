import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from './../config/firebase';

interface signupType {
  id: string;
  password: string;
  nickname?: string;
}
interface userType {
  userId: string;
  userEmail: string | null;
  userName: string | null;
  userImg: string;
}

const basicImg = 'https://github.com/rmdkak/Quiz-Play-Ground/assets/92218638/6ac8e9b4-f269-48d7-8943-bfd00d833d51';

export const signup = async ({ id, password, nickname }: signupType) => {
  const userCredential = await createUserWithEmailAndPassword(auth, id, password);
  if (auth.currentUser !== null) {
    await updateProfile(auth.currentUser, { displayName: nickname });
  }

  const newUser: userType = {
    userId: userCredential.user.uid,
    userEmail: userCredential.user.email,
    userName: userCredential.user.displayName,
    userImg: basicImg
  };
  const collectionRef = collection(db, 'users');
  await addDoc(collectionRef, newUser);
  await signOut(auth);
};

export const logout = async () => {
  await signOut(auth);
};

export const login = async ({ id, password }: signupType) => {
  await signInWithEmailAndPassword(auth, id, password);
};
