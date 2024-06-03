import React from 'react'
import {NavLink} from "react-router-dom";
import './layout.css'
import { IoHomeOutline,IoAddCircleOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import useToggleStore from "../Store/useToggleStore"
import { CgProfile } from "react-icons/cg";
import { Box, Heading,Button} from '@chakra-ui/react'
import {Link} from 'react-scroll'
import authStore from "../Store/authStore"

const Navbar=()=>{
  const {toggleNav, isViewProfile,viewProfile } = useToggleStore()
   const {loggedIn} =authStore()
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
<div className="side-menu">
        <nav>
            <ul>
                <NavLink to="/" onClick={()=>{
                  toggleNav()
                  closeProfile()
              window.scrollTo(0,0)
                  }}> 
                <li><IoHomeOutline
                className="icon-nav" />Home</li>
                </NavLink>
{loggedIn && <>            
<NavLink to="/notio/add-note" onClick={()=>{
  toggleNav()
  closeProfile()
}
  
}>
<li><IoAddCircleOutline className="icon-nav"/>Add</li>
</NavLink>

<NavLink onClick={()=>{
  toggleNav()
  checkProfile()
}}>
<li><CgProfile className="icon-nav"/>Profile</li>
</NavLink>
</>
}

<Link to="about" spy={true} 
      smooth={true} 
      offset={-100} 
      duration={500}  onClick={()=>{
  toggleNav()
  closeProfile()
}}>
                <li><FcAbout className="icon-nav" />Contact</li>
           </Link>
           
<Link to="about" spy={true} 
      smooth={true} 
      offset={-100} 
      duration={500}  onClick={()=>{
  toggleNav()
  closeProfile()
}}>
                <li><FcAbout className="icon-nav" />About</li>
           </Link>
            </ul>
        </nav>
    </div>
    )
}
export default Navbar