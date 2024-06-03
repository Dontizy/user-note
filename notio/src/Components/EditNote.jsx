import { Box, Heading, Text,FormControl, FormLabel, Input, Textarea,Button} from '@chakra-ui/react'
import {editnote} from './services/noteService'
import noteStore from './Store/noteStore'
import {useToast} from '@chakra-ui/react'
import useToggleStore from "./Store/useToggleStore"

const EditNote =({isEdit, setIsEdit, store})=>{
  const toast = useToast()
  const editNote = noteStore((state)=>state.editNote)
  const {isEditNote, toggleEditNote} = useToggleStore()
  
  const edit = async (e, id)=>{
    e.preventDefault()
    await editnote(id, e.target).then(res =>{
      editNote(res)
      toast({
          title:"Note has been updated!",
            position:"top",
            status:"success",
            duration:2000,
            isClosable: true,
          })
        toggleEditNote()
        store.fetchDetailNote(store.note._id)
        window.scrollTo(0,0)
    }).catch(err=>{
     console.log(err)
     toast({
          title:"Updating failed, an error occurred while performin update.",
            position:"top",
            status:"error",
            duration:2000,
            isClosable: true,
          })
   })
   
 }
 
  return (
    <Box display="flex" w="100%" minH="500px" justifyContent="center" alignItems="center">
    <Box p="10px" w="92%" minH="400px" bg="#fff" borderRadius="20px">
    <Heading size="md">Edit Note</Heading>
    <form onSubmit={(e)=>edit(e, store.note._id)} style={{marginTop:"20px"}}>
    <FormControl mt="25px">
       <FormLabel>Title</FormLabel>
       <Input type="text" placeholder="Title" name="title" defaultValue={store.note.title}/>
    </FormControl>
    
    <FormControl mt="25px">
      <FormLabel>Note</FormLabel>
      <Textarea defaultValue={store.note.content} name="content" placeholder="Note something down" minH="200px"/>
    </FormControl>
    <FormControl mt="25px" display="flex" justifyContent="space-between">
    <Button colorScheme="twitter" type="submit">Save Note</Button>
    <Button onClick={toggleEditNote}>Cancel</Button>
    </FormControl>
    </form>
    
    </Box>
     <Box>
     
     
    </Box>
    </Box>
  )
}
export default EditNote;