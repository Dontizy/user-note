import { Box, Heading, Text, Divider ,Button} from '@chakra-ui/react'
import { MdDeleteForever } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import {NavLink} from "react-router-dom"
import moment from "moment"
import DeleteListAlert from './DeleteListAlert'
import useToggleStore from "./Store/useToggleStore"

const NoteList =({note, removeNote})=>{
  const {isViewProfile,viewProfile } = useToggleStore()
  const checkProfile =()=>{
    if(!isViewProfile){
      viewProfile()
    }
  }
  const closeProfile =()=>{
    if(isViewProfile){
      viewProfile()
    }
  }
  return(
     <div className="note" onClick={closeProfile}>
     <NavLink to={`/notio/note/${note._id}`} onClick={()=>window.scrollTo(0, 0)}>
     <Box noOfLines={2} w="100%" ml="5px">
            <Heading fontStyle="italic" size="sm">
            {note.title}
            </Heading>
            <Text fontStyle="italic" noOfLines={1}>
            {note.content}
            </Text>
      </Box>
      </NavLink>
            <Divider/>
            <div className="note-list-info">
                <Text ml="5px" display="flex" alignItems="center" fontSize="14px"><span style={{marginRight:"10px"}}><SlCalender/></span> {moment(note.createdAt).fromNow()}</Text>
                  <span className="del-span">
                  <DeleteListAlert
  MdDeleteForever={ MdDeleteForever } note={note} removeNote={removeNote}/>
                  </span>
            </div>
          
        </div>
    )
}

export default NoteList;