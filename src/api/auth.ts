import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from './../config/firebase';

interface signupType {
  id: string;
  password: string;
  nickname: string;
}

export const signup = async ({ id, password, nickname }: signupType) => {
  console.log(id, password, nickname);
  await createUserWithEmailAndPassword(auth, id, password);
  if (auth.currentUser !== null) {
    await updateProfile(auth.currentUser, { displayName: nickname });
  }
};
