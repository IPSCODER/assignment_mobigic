import React, { useContext, useState } from 'react'
import axios from "axios"
import classes from "./login.module.css"
import Form from '../../components/form/Form'
import { ContextProvider } from '../../App'
import Alert from '../../components/alert/Alert'

const Login = () => {

    const {setLogin,alert,setAlert} = useContext(ContextProvider)


    const [loginData,setLoginData] = useState({
        username:'',
        password:''
    })

    const changeHandler = (e) =>{
        const {name,value} = e.target;
        setLoginData({...loginData,[name]:value})
    }

   
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (!loginData.username == "" && !loginData.password == "") {
            await axios.post("https://mg-fxx9.onrender.com/user/signin",{username:loginData.username,password:loginData.password}).then((resp)=>{   
                {typeof(resp.data) == 'string' && setAlert(resp.data) }
                localStorage.setItem("name",resp.data.result.username)
                setLogin(true)
        }).catch((err) =>{
            console.log(err)
        })
        }else{
            setAlert("Insert Username and Password")
        }
        
    }


  return (
    <section className={classes.login} >
        <Form heading={"Sign In"} head_url="/signup" another_link="Sign Up" data={loginData} changeHandler={changeHandler} submitHandler={submitHandler} />
        <Alert>
            {alert}
        </Alert>
    </section>
  )
}

export default Login
