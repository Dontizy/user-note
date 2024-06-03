import {create} from "zustand"
import {getnotes, addnote, notedetail} from '../services/noteService'
//import toast  from 'react-toastify';


const noteStore = create((set) => ({
  notes:[],
  note:{},
  fetchNote:(notes)=>set((state)=>({notes})),
createNote:(notes)=>set((state)=>(notes)),
fetchDetailNote:async(id)=>{
 await notedetail(id).then(res=>{
  set({note:res})
  }).catch(err=>{
    console.log(err)
    toast.error("couldn't fetch note, unknown error occourred")
  })
},
deleteNote:(id)=>set((state)=>({notes:state.notes.filter((note)=>note._id !== id)}
)),
editNote:(note)=>set((state)=>({note}))
}))
export default noteStore;