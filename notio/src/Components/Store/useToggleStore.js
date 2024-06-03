import {create} from 'zustand'

const useToggleStore = create((set)=>({
  isToggleNav:false,
  isEditNote:false,
  isViewProfile:false,
  toggleNav: ()=>set((state)=>({isToggleNav: !state.isToggleNav})),
  toggleEditNote: ()=>set((state)=>({isEditNote: !state.isEditNote})),
  viewProfile:()=>set((state)=>({
    isViewProfile: ! state.isViewProfile
  }))
  
}))
export default useToggleStore;