import { create } from 'zustand';

interface UserStateType {
  user: object;
  loginUser: () => void;
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

export const userStore = create<UserStateType>(set => ({
  user: { userId: null, userName: null, userEmail: null },
  loginUser: () => {},
  logoutUser: () => {},
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

export const addGameStore = () => {};
