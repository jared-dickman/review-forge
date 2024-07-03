import {create} from 'zustand'

export const useAppStateStore = create(set => ({
  isLoading: '',
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))
