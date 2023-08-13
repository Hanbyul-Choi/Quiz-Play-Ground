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
  openCorrectModal: () => void;
  closeCorrectModal: () => void;
  openInCorrectModal: () => void;
  closeInCorrectModal: () => void;
}
interface AuthModalStateType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

interface ActiveButtonStateType {
  activeButton: 'addGame' | 'myPage' | null;
  setActiveButton: (type: 'addGame' | 'myPage' | null) => void;
}
interface dataType {
  uid: string | null;
  email: string | null;
  name: string | null;
}

interface timerType {
  timer: number;
  setTimer: (newTime: number) => void;
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
  openCorrectModal: () => {
    set(() => ({ isCorrectModalOpen: true }));
  },
  closeCorrectModal: () => {
    set(() => ({ isCorrectModalOpen: false }));
  },
  openInCorrectModal: () => {
    set(() => ({ isInCorrectModalOpen: true }));
  },
  closeInCorrectModal: () => {
    set(() => ({ isInCorrectModalOpen: false }));
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
  }
}));

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

export const setTimerStore = create<timerType>(set => ({
  timer: 0,
  setTimer: newTime => {
    set({ timer: newTime });
  }
}));

export const gameResultStore = create<gameResult>(set => ({
  score: 0,
  totalQuiz: 0,
  sendScore: score => {
    set({ score });
  },
  sendTotalQuiz: totalQuiz => {
    set({ totalQuiz });
  },
  initState: () => {
    set({ score: 0, totalQuiz: 0 });
  }
}));

interface gameResult {
  score: number;
  totalQuiz: number;
  sendScore: (score: number) => void;
  sendTotalQuiz: (totalQuiz: number) => void;
  initState: () => void;
}
