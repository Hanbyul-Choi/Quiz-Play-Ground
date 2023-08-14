import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { auth, db, storage } from './../config/firebase';

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
interface updateUserType {
  userId: string;
  newName: string;
}

export interface getUserType {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  userImg?: string;
}

export interface getUsersType {
  userEmail: string;
  userId: string;
  userImg: string;
  userName: string;
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
  await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
  await signOut(auth);
};

export const logout = async () => {
  await signOut(auth);
};

export const login = async ({ id, password }: signupType) => {
  const userCredential = await signInWithEmailAndPassword(auth, id, password);
  const user = userCredential.user;
  sessionStorage.setItem('userId', user.uid);
  sessionStorage.setItem('userEmail', user.email as string);
  sessionStorage.setItem('userName', user.displayName as string);
  return user;
};

export const updateUserName = async ({ userId, newName }: updateUserType) => {
  if (auth.currentUser !== null) {
    await updateProfile(auth.currentUser, { displayName: newName });

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      userName: newName
    });
    return userRef;
  }
};

export const getUser = async (userId: string | null) => {
  const q = query(collection(db, 'users'), where('userId', '==', userId));
  const user: getUserType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    user.push({ id: doc.id, ...doc.data() });
  });

  return user;
};

export const updateUserImg = async (selectedFile: File) => {
  const userId = sessionStorage.getItem('userId');
  if (userId !== null) {
    const imageRef = ref(storage, `${userId}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    sessionStorage.setItem('userImg', downloadURL);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      userImg: downloadURL
    });
    return downloadURL;
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const data: getUsersType[] = [];

  querySnapshot.forEach(doc => {
    const users: getUsersType = {
      userEmail: '',
      userId: '',
      userImg: '',
      userName: '',
      ...doc.data()
    };
    data.push(users);
  });
  return data;
};
