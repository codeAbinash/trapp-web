import { create } from 'zustand'
type Count = {
  followCount: number
  setFollowCount: (count: number) => void
  likeCount: number
  setLikeCount: (count: number) => void
  dislikeCount: number
  setDislikeCount: (count: number) => void
}

export const useCountStore = create<Count>((set) => ({
  followCount: 0,
  setFollowCount: (count) => set({ followCount: count }),
  likeCount: 0,
  setLikeCount: (count) => set({ likeCount: count }),
  dislikeCount: 0,
  setDislikeCount: (count) => set({ dislikeCount: count }),
}))
