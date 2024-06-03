import authStore from "../Store/authStore"
import {useEffect} from 'react'
import {Heading, Text} from '@chakra-ui/react'
import {Navigate} from 'react-router-dom'

export const RequireAuth =(props)=>{
  const store = authStore()
  
  useEffect(()=>{
   if(store.loggedIn === null){
      store.checkAuth();
  }
  },[])
  // if(!store.loggedIn){
  //   return <div>
  //   <Heading>Please Login</Heading>
  //   <Text>{store.loginError}</Text>
  //   </div>
  // }
  if(store.loggedIn===false){
    return <Navigate to="/notio/login"/>
  }
  return (
    <div>
     {props.children}
    </div>
  )
}


