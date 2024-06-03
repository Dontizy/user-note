import { Box, Heading, Text, Divider ,Button, FormLabel,FormControl,
  FormErrorMessage,
  FormHelperText, Input, Textarea} from '@chakra-ui/react'
import noteStore from "./Store/noteStore"
import {useNavigate} from "react-router-dom"
import {getnotes, addnote, notedetail} from './services/noteService'
import { useToast } from '@chakra-ui/react'
import {useState} from "react"



const AddNote =()=>{
  const createNote= noteStore((state)=>state.createNote)
  const navigate = useNavigate()
  const toast = useToast()
  
  const add =async(e)=>{
  e.preventDefault()
  await addnote(e.target).then(res=>{
    createNote(res)
    navigate("/")
         toast({
          title:"Note created succsssfully",
            position:"top",
            status:"success",
            duration:2000,
            isClosable: true,
          })
          window.scrollTo(0,0)
    
  }).catch(err=>{
     const {message} = err.response.data
     toast({
          //title:"error occured while saving note",
            title:`${message && "Unknown error occured, note not saved"}`,
            position:"top",
            status:"error",
            duration:3000,
            isClosable: true,
              })
    console.log(err)
  })
  
  }
  return (
    <Box display="flex" w="100%" minH="500px" justifyContent="center" alignItems="center">
    <Box p="10px" w="92%" minH="400px" bg="#fff" borderRadius="20px">
    <Heading mt="20px" size="md">Add Note</Heading>
    
    <form method="submit" onSubmit={add} style={{marginTop:"20px"}}>
    <FormControl mt="25px">
       <FormLabel>Title</FormLabel>
       <Input type="text" placeholder="Title" name="title" />
    </FormControl>
    
    <FormControl mt="25px">
      <FormLabel>Note Content</FormLabel>
      <Textarea name="content" placeholder="Note something down" minH="200px"/>
    </FormControl>
    <FormControl mt="25px">
    <Button type="submit">Save Note</Button>
    </FormControl>
    </form>
    
    </Box>
     <Box>
     
     
    </Box>
    </Box>
    )
}
export default AddNote;