import { MdOutlineMenuOpen } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { Box, Heading,Button} from '@chakra-ui/react'
import {NavLink, useNavigate} from "react-router-dom"
import useToggleStore from '../Store/useToggleStore.js'
import authStore from "../Store/authStore"
import { RiLogoutCircleRFill,RiLogoutCircleFill} from "react-icons/ri";
import axios from 'axios'
import {authUser} from '../services/authService'


const Header = ()=>{
  const {isToggleNav, toggleNav, isViewProfile, viewProfile} = useToggleStore()
  const {loggedIn} = authStore()
  const navigate = useNavigate()
  const logout =authStore((state)=>state.logout)
  const closeNav =()=>{
    if(isToggleNav){
      toggleNav()
    }
  }
  const closeProfile =()=>{
    if(isViewProfile){
      viewProfile()
    }
  }
  const logoutUser =async()=>{
    await axios.get(authUser+"/logout/user").then(res=>{
      logout()
      navigate("/")
    }).catch(err=>{
      console.log(err)
    })
  }

  return(
    <header>
        <div style={{borderBottom:`${!isToggleNav ? '2px solid #6082B6':'none'}`}} className="nav-icon-container">
        
        <div className="icon-menu" onClick={toggleNav}>
           {isToggleNav ?
           (
             <GiCrossedSabres size="30"/>
             ):(
            <MdOutlineMenuOpen size="30"/>
             )
           }
           </div>
        </div>
        <div className="site-name-container">
            <h1>Notio</h1>
            { loggedIn ? (
              <Button bg="white" p="7px" onClick={()=>{
                closeNav()
                logoutUser()
                closeProfile()
              }} mr="5px">
           <RiLogoutCircleFill color="#13274F" size="18px"/> 
           Logout
            </Button>):
            (<NavLink to="/notio/login">
            <Button onClick={closeNav} mr="5px">
           <RiLogoutCircleFill/> Login
            </Button>
           </NavLink>
           )
            }
        </div>
    </header>
    )
}
export default Header;