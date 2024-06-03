import { Box, Heading, Text, Divider ,Button, FormLabel,FormControl,
  FormErrorMessage,
  FormHelperText, Input, Textarea, useToast} from '@chakra-ui/react'
import EditNote from "./EditNote"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import noteStore from './Store/noteStore'
import moment from "moment"
import {deletenote, editnote} from './services/noteService'
import DeleteAlert from './DeleteAlert'
import useToggleStore from "./Store/useToggleStore"


const NoteDetail =()=>{
 const {isEditNote, toggleEditNote} = useToggleStore()
 const {noteId} = useParams()
 const navigate = useNavigate()
 const store = noteStore()
 const deleteNote = noteStore((state)=>state.deleteNote)
 const toast = useToast()
 useEffect(()=>{
   store.fetchDetailNote(noteId)
 },[])
 
 const removeNote =async(id)=>{
   await deletenote(id).then(res=>{
     deleteNote(id)
     toast({
          title:"Note Deleted!!",
            position:"top",
            status:"success",
            duration:2000,
            isClosable: true,
          })
     navigate("/")
   }).catch(err=>{
     console.log(err)
     toast({
          title:"Delete failed, an error occurred while performin delete.",
            position:"top",
            status:"error",
            duration:2000,
            isClosable: true,
          })
   })
 }
 console.log(store.note)
  return(
    <>
  {isEditNote ? (
    <EditNote store={store}/>
    ):(<Box w="100%" minH="700px"  display="flex" justifyContent="center">
    <Box  w="95%" mt="18px" minH="300px" mb="30px">
    <Box borderRadius="20px" display="flex" justifyContent="space-between" flexDirection="column" minH="250px" bg="#fff">   
    <Box ml="7px">
    <Text>{moment(store.note.createdAt).format('h:mm A MMMM Do, YYYY')}</Text>
       <Heading fontStyle="italic" size="md">{store.note.title} </Heading>
       <Text fontStyle="italic">
       {store.note.content}
       </Text>
       </Box>
  <Divider/>
       <Box alignItems="center" display="flex" h="55px" w="88%" ml="7px"
       justifyContent="space-between"
       >
        <Button onClick={toggleEditNote}  colorScheme="yellow">Edit</Button>
   <DeleteAlert removeNote={removeNote} store={store}/>
   {console.log(store.note._id)}
       </Box>
       </Box>
      </Box>
    </Box>
    )
  }
    </>
    )
}
export default NoteDetail;