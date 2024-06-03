import {create} from 'zustand'
import axios from 'axios'
import {authUser} from '../services/authService'


const authStore = create((set)=>({
  loggedIn:null,
  loginError:null,
  user:{},
  fetchUser:(user)=>set((state)=>({user})),
  logIn:()=>set((state)=>({loggedIn:true})),
  signUp:(user)=>set((state)=>({user})),
  checkAuth:async()=>{
    await axios.get(authUser+"/check-auth/user").then(res=>{
      set({loggedIn:true})
    }).catch(err=>{
      console.log(err)
      set({loggedIn:false,
           loginError:err.response.data.message
      })
    })
  },
  logout:()=>set((state)=>({loggedIn:false}))
}))

export default authStore;