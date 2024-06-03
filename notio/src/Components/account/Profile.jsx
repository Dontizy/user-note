import { Image, Box, Heading, Text, Divider, Button, Avatar, Wrap, WrapItem} from '@chakra-ui/react'
  import { IoMdClose } from "react-icons/io";
import './profilestyle.css'
import avatar from '../img/smile-2072907_1280.jpg'
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import useToggleStore from "../Store/useToggleStore"
import authStore from "../Store/authStore";
import {useEffect} from 'react'
import {getuser} from '../services/authService'


const Profile =()=>{
  const {viewProfile} =useToggleStore()
  const fetchUser = authStore((state)=>state.fetchUser)
  const {user} = authStore()
  const getUser =async()=>{
   await getuser().then(res=>{
      fetchUser(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getUser()
},[])  
console.log("user:", user)


return (
    <>
    <div className="profile-container">
    <div className="close-profile">
     <Button onClick={viewProfile} p="5px" border="5px solid #3C5B6F" borderRadius="100%"><IoMdClose /></Button>
     </div>
    <div className="profile">
      <div className="imageAvatar">
 <Wrap>
  <WrapItem>
    <Avatar size="xl" name='Dan Abrahmov' src={avatar} />
  </WrapItem>
</Wrap>
<Box>
 <Heading size="xs">Total Notes</Heading>
 <Text align="center" m="0 auto" bg="#3C5B6F" color="#fff" w="25px" h="25px" borderRadius="100%">{user.count}</Text>
</Box>
<Box w="100%">
   <Heading align="center" size="xs">Todo List 15</Heading>
   <Box display="flex" gap="10px" justifyContent="center">
     <Text gap="3px" display="flex" alignItems="center">5 <IoMdCheckmarkCircle size="20px" color="green"/>
     </Text>
     <Text display="flex" alignItems="center" gap="3px">10 <FcCancel size="21px"/></Text>
   </Box>
</Box>
<Button size="xs" mb="3px">Update Profile</Button>
    </div>
    <div className="data-info">
    <Heading size="md" mt="3px">Email</Heading>
    <Text display="flex" alignItems="center"><MdOutlineEmail size="20px"/>{user.email}</Text>
    <Heading size="md" mt="3px">Name</Heading>
    <Text display="flex" alignItems="center"><FaRegUser size="20px"/> Raphael Donatus</Text>
    
    </div>
    </div>
  
  </div>
  </>)
}
export default Profile;