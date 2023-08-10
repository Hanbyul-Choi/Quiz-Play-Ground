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

interface dataType {
  id: string | null;
  email: string | null;
  name: string | null;
}

export const userStore = create<UserStateType>(set => ({
  userId: null,
  userEmail: null,
  userName: null,
  loginUser: ({ id, email, name }: dataType) => {
    set(state => ({ userId: id, userEmail: email, userName: name }));
  },
  logoutUser: () => {
    set(state => ({ userId: null }));
  },
  updateUser: () => {}
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
