import { useState } from 'react'
import {BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home'
import SharedLayouts from './Components/Layout/SharedLayouts'
import AddNote from "./Components/AddNote"
import NoteDetail from "./Components/NoteDetail"
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import {RequireAuth} from './Components/account/RequireAuth'


function App() {
  
  return (
    <>
    <ChakraProvider>
    <ToastContainer/>
  <BrowserRouter>
    <Routes>
        <Route path="/"
        element={<SharedLayouts/>}>
          <Route index element={<RequireAuth>
          <Home/>
          </RequireAuth>
          }/>
          <Route path="/notio/add-note/" element={<AddNote/>}/>
<Route path='/notio/note/:noteId'
          element={<NoteDetail/>}/>
    <Route path='/notio/login'
          element={<Login/>}/>
       <Route path='/notio/signup'
          element={<SignUp/>}/>   
           </Route>
     </Routes>
</BrowserRouter>
 </ChakraProvider>
    </>
  )
}

export default App;
