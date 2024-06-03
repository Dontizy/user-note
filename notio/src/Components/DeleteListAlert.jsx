import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  Box
} from '@chakra-ui/react'
import { MdDeleteForever } from "react-icons/md";



const DeleteAlert=({removeNote, note})=>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme="none" borderRadius="20%" p="0" size="xs" onClick={onOpen}>
        <MdDeleteForever size="15px"/>
      </Button>
      <AlertDialog 
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'
            as="aside"
            >
              Delete Student Record
            </AlertDialogHeader>

            <AlertDialogBody as="section">
              Are you sure You want to delete Note? you can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter as="section">
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={(e)=>{
                removeNote(note._id)
                onClose()
              }
              } ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>  
  )
}

export default DeleteAlert;