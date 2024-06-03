import axios from 'axios'

export const authUser = import.meta.env.VITE_AUTH_NOTIO

export const login_user =async(user)=>{
 return await axios.post(authUser+'/login',{
   email:user.email.value,
   password:user.password.value
   }).then(res=>{
     return res.data
   })
}

export const signup_user =async(user)=>{
 return await axios.post(authUser+'/signup',{
   email:user.email.value,
   password:user.password.value,
   }).then(res=>{
     return res.data
   })
}

export const getuser = async()=>{
  return await axios.get(authUser+"/user").then(res=>{
    return res.data
  })
}