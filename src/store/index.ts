import { create } from 'zustand';

interface ModalState {
  isCorrectModalOpen: boolean;
  isInCorrectModalOpen: boolean;
  toggleCorrectModal: () => void;
  toggleInCorrectModal: () => void;
}

interface AuthStateType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const userStore = create(set => ({
  users: [],
  addUser: () => {},
  deleteUser: () => {},
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

export const loginStateStore = create<AuthStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));
  }
}));

export const signUpStateStore = create<AuthStateType>(set => ({
  isModalOpen: false,
  toggleModal: () => {
    set(state => ({ isModalOpen: !state.isModalOpen }));
  }
}));
