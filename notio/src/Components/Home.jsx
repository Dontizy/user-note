import {NavLink} from "react-router-dom"
import { Box, Heading, Text, Image} from '@chakra-ui/react'
import './home.css'
import NoteList from "./NoteList"
import {useEffect,useState} from "react"
import noteStore from "./Store/noteStore"
import { useToast } from '@chakra-ui/react'
import {deletenote, getnotes} from "./services/noteService"
import Spinner from './Layout/Spinner'

const Home =()=>{
  const store = noteStore()
  const deleteNote = noteStore((state)=>state.deleteNote)
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const fetchNote = noteStore((state)=>state.fetchNote)

const noteFetch = async()=>{
  await getnotes().then(res=>{
    fetchNote(res)
    setLoading(false)
    }).catch(err=>{
      console.log(err)
      setLoading(false)
      toast({
           title:"Server down, please try again later",
            position: "top",
            status:"error",
            duration: 3000,
            isClosable: true,
              })
  })
}

  useEffect(()=>{
    noteFetch()
  },[])
  console.log(store.notes)
  const removeNote =async(id)=>{
   await deletenote(id).then(res=>{
     deleteNote(id)
     toast({
          title:"Note deleted succsssfully",
            position:"top",
            status:"success",
            duration:3000,
            isClosable: true,
              })
    //store.fetchNote()
   }).catch(err=>{
     console.log(err)
     toast({
           title:"Delete failed, an error occurred while performin delete.",
            position: "top",
            status:"error",
            duration: 3000,
            isClosable: true,
              })
   })
 }
 console.log("is it really loading:", loading)
 console.log(store.error)
  return (
    <>
    <Box display="flex" alignItems="center" justifyContent="center" bg="#F0EBE3" height="120px">
    <Box w="260px">
       <Heading as="h3" size="md" >Welcome To Notio</Heading>
       <Text>Where memories are forever saved. to the ammusement of tommorow</Text>
       </Box>
    </Box>
    <Box minH="150px" bg="#fff">
       <Heading m="10px" pt="10px" align="center" size="sm">
       {loading ? "Loading...":`All Notes (${store.notes.length})`
       }</Heading>
       { loading && <div className="spinner-container">
        <Box>
         <Spinner/>
        </Box>
       </div>}
       
      {!loading && <div className="note-container">
       {
       store?.notes.map((note)=>{
         return <NoteList removeNote={removeNote} key={note._id} note={note}/>
       })
      }
     </div>
}
</Box>
    </>
    )
}

export default Home;