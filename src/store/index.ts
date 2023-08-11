import { create } from 'zustand';

interface UserStateType {
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  loginUser: (data: dataType) => void;
  logoutUser: () => void;
  updateUser: () => void;
}
interface ModalState {
  isCorrectModalOpen: boolean;
  isInCorrectModalOpen: boolean;
  toggleCorrectModal: () => void;
  toggleInCorrectModal: () => void;
}
interface AuthModalStateType {
  isModalOpen: boolean;
  toggleModal: () => void;
}


interface ActiveButtonStateType {
  activeButton: 'addGame' | 'myPage' | null;
  setActiveButton: (type: 'addGame' | 'myPage' | null) => void;

interface dataType {
  uid: string | null;
  email: string | null;
  name: string | null;

}

export const userStore = create<UserStateType>(set => ({
  userId: sessionStorage.getItem('userID'),
  userEmail: sessionStorage.getItem('userEmail'),
  userName: sessionStorage.getItem('userName'),
  // userImg: sessionStorage.getItem('userImg'),
  loginUser: ({ uid, email, name }: dataType) => {
    set(() => ({ userId: uid, userEmail: email, userName: name }));
  },
  logoutUser: () => {
    set(() => ({ userId: null }));
  },
  updateUser: () => {
    set(state => ({ ...state, userName: sessionStorage.getItem('userName') }));
  }
}));

export const modalStateStore = create<ModalState>(set => ({
  isCorrectModalOpen: false,
  isInCorrectModalOpen: false,
  toggleCorrectModal: () => {
    set(state => ({ isCorrectModalOpen: !state.isCorrectModalOpen }));
  },
  toggleInCorrectModal: () => {
    set(state => ({ isInCorrectModalOpen: !state.isInCorrectModalOpen }));
  }
}));

export const loginStateStore = create<AuthModalStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));
  }
}));

export const signUpStateStore = create<AuthModalStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));
  }
}));


export const activeButtonStore = create<ActiveButtonStateType>(set => ({
  activeButton: null,
  setActiveButton: type => {
    set({ activeButton: type });

export const updateProfileStateStore = create<AuthModalStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));
  }
}));

export const updateImgStateStore = create<AuthModalStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));

  }
}));
