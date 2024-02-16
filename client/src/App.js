import { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import View from './pages/view/View';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Header from './components/header/Header';


 export const ContextProvider = createContext()


function App() {

  const [login,setLogin] = useState(false)
  const [comfirmBtn,setComfirmBtn] = useState(null)
  const [comfirmInput,setComfirmInput] = useState('')
  const [alert,setAlert] = useState(null)

  useEffect(()=>{
    if (localStorage.getItem("name") !==null) {
      setLogin(true)
    }else{
      setLogin(false)
    }
  },[localStorage.getItem("name")])

  

  return (
    <ContextProvider.Provider value={{login,setLogin,comfirmBtn,setComfirmBtn,comfirmInput,setComfirmInput,alert,setAlert}}>
    <BrowserRouter>
    {login && <Header/>}
    <Routes>
    {login ? (
      <>
      <Route path="/" element={<Home/>} />
      <Route path="/view/:id" element={<View/>} />
      </>
      ) : 
      <>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Register/>} />
      </>
    }
    </Routes>
    </BrowserRouter>
    </ContextProvider.Provider>
  );
}

export default App;
