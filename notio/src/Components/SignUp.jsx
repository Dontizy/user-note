import { Box, Heading, Text, Divider ,Button, FormLabel,FormControl,
  FormErrorMessage,
  FormHelperText, Input, Textarea} from '@chakra-ui/react'
import {NavLink, useNavigate} from "react-router-dom"
import authStore from './Store/authStore'
import {signup_user} from './services/authService'
import {useToast} from '@chakra-ui/react'
import useInputValidator from './Hooks/useInputValidator'

const SignUp =()=>{
  const signUp = authStore((state)=>state.signUp)
  const toast =useToast()
  const {emailInput, passwordInput, setValidatorLogger, validatorLogger} = useInputValidator()
  const navigate = useNavigate()
  
  const handleSignup =async(e)=>{
    e.preventDefault()
    await signup_user(e.target).then(res=>{
      toast({
        title:"Account created successfully !",
        position:"top",
        status:"success",
        duration:5000,
        isClosable: true,
      })
      navigate("/")
      signUp(res)
    }).catch(err=>{
      console.log(err)
      if(err.message.indexOf("Network Error") !== -1){
      toast({
          title:`${err.message && "Signup failed, unknown error!"}`,
            position:"top",
            status:"error",
            duration:2000,
            isClosable: true,
          })
      }
          const InputMessage = err.response.data.message;
      setValidatorLogger(InputMessage)
    })
  }
  console.log("email", emailInput)
  return (
    <main>
    <Box display="flex" w="100%" minH="500px" justifyContent="center" alignItems="center">
    <Box p="10px" w="92%" minH="400px" bg="#fff" borderRadius="20px">
    <Heading mt="20px" size="md">Create an account</Heading>
    <form onSubmit={handleSignup} style={{marginTop:"20px"}}>
    <FormControl isInvalid={emailInput} as="fieldset" mt="25px">
       <FormLabel>Email</FormLabel>
       <Input type="email" placeholder="email" name="email"/>
       {emailInput && <FormErrorMessage>
         {validatorLogger}
       </FormErrorMessage>
       }
    </FormControl>
    
    <FormControl isInvalid={passwordInput} mt="25px" as="fieldset">
      <FormLabel>Password</FormLabel>
      <Input type="password" placeholder="Password" name="password"/>
      {passwordInput && <FormErrorMessage>
            {validatorLogger}
      </FormErrorMessage>
      }
    </FormControl>
    <Text mt="10px">Already have an account? <span style={{color:"blue"}}><NavLink to="/notio/login">Login Account</NavLink></span></Text>
    <FormControl mt="15px">
    <Button type="submit" w="140px" colorScheme="twitter">Signup</Button>
    </FormControl>
    </form>
    </Box>
     <Box>
     
     
    </Box>
    </Box>
    </main>
    )
}
export default SignUp;