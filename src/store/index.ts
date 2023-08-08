import { create } from 'zustand';

export const userStore = create(set => ({
  users: [],
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {}
}));
