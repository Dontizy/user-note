import { Box, Heading, Text, Divider ,Button, FormLabel,FormControl,
  FormErrorMessage,
  FormHelperText, Input,useToast, Textarea} from '@chakra-ui/react'
import {NavLink,useNavigate} from "react-router-dom"
import authStore from './Store/authStore'
import {login_user} from "./services/authService"
import useInputValidator from './Hooks/useInputValidator'


const Login =()=>{
  const logIn = authStore((state)=>state.logIn)
  const store = authStore()
  const toast = useToast()
  const navigate = useNavigate()
  const {emailInput, passwordInput, setValidatorLogger, validatorLogger} = useInputValidator()
  const loginUser =async(e)=>{
    e.preventDefault()
    await login_user(e.target).then(res=>{
      logIn()
      toast({
          title:"welcome back succsssfully",
            position:"top",
            status:"success",
            duration:2000,
            isClosable: true,
          })
         navigate("/")
    }).catch(err=>{
      console.log(err)
      if(err.message.indexOf("Network Error") !== -1){
      toast({
        title:`${err.message && "Server temporaly down or under going maintainance, Please try again later"}`,
        position:"top",
            status:"error",
            duration:2500,
            isClosable: true, 
      })
      }
      const inputMessage= err.response?.data.message
      setValidatorLogger(inputMessage)
    })
  }
console.log(store.loggedIn)
  return (
    <main>
    <Box display="flex" w="100%" minH="500px" justifyContent="center" alignItems="center">
    <Box p="10px" w="92%" minH="400px" bg="#fff" borderRadius="20px">
    <Heading mt="20px" size="md">Login Notio</Heading>
    <form onSubmit={loginUser} style={{marginTop:"20px"}}>
    <FormControl isInvalid={emailInput} mt="25px" as="fieldset">
       <FormLabel>Email</FormLabel>
       <Input type="email" placeholder="email" name="email"/>
      {
        emailInput && <FormErrorMessage>
              {validatorLogger}
        </FormErrorMessage>
      }
    </FormControl>
    
    <FormControl isInvalid={passwordInput} mt="25px" as="fieldset">
      <FormLabel>Password</FormLabel>
      <Input type="password" placeholder="Password" name="password"/>
      {passwordInput &&
      <FormErrorMessage m="2px"> {validatorLogger}</FormErrorMessage>
      }
    </FormControl>
    <Text mt="10px">Don't have an account? <span style={{color:"blue"}}><NavLink to="/notio/signup">Create Account</NavLink></span></Text>
    <FormControl mt="15px">
    <Button type="submit" w="140px" colorScheme="twitter">Login</Button>
    </FormControl>
    </form>
    </Box>
     <Box>
     
     
    </Box>
    </Box>
    </main>
    )
}
export default Login;