import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'
import Profile from "../account/Profile"
import useToggleStore from '../Store/useToggleStore'
import About from '../About.jsx'

const SharedLayouts =()=>{
  const {isToggleNav, isViewProfile} = useToggleStore()
  
  return(
    <>
     <Header />
     {
       isToggleNav && 
       <Navbar/>
     }  <main>
          <Outlet/>
        {isViewProfile &&
          <Profile />
        }
          <About/>
          </main>
     <Footer/>
    </>
    )
}
export default SharedLayouts;