import React, { useContext, useState } from 'react'
import classes from "./register.module.css"
import Form from '../../components/form/Form'
import axios from "axios";
import { ContextProvider } from '../../App'
import Alert from '../../components/alert/Alert';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const {setLogin,alert,setAlert} = useContext(ContextProvider)
    const navigate = useNavigate()

    const [registerData,setRegisterData] = useState({
        username:'',
        password:''
    })

    const changeHandler = (e) =>{
        const {name,value} = e.target;
        setRegisterData({...registerData,[name]:value})
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        if (!registerData.username == "" && !registerData.password == "" && registerData.password.length == 6 && registerData.username.length > 5 ) {
            await axios.post("https://mg-fxx9.onrender.com/user/signup",{username:registerData.username,password:registerData.password}).then((resp)=>{    
                {typeof(resp.data) == 'string' && setAlert(resp.data) }
            localStorage.setItem("name",resp.data.result.username)
            setLogin(true)
            navigate("/")
        }).catch((err) =>{
            console.log(err)
        })
        }else if (registerData.username.length < 5) {
            setAlert("Insert More Than 5 Digit Username")
        }else if (registerData.password.length !== 6) {
            setAlert("Insert 6 Digit Password")
        }else{
            setAlert("Insert Username and Password")
        }
        
    }


  return (
    <section className={classes.register} >
        <Form heading={"Sign Up"} head_url="/" another_link="Sign In" data={registerData} changeHandler={changeHandler} submitHandler={submitHandler} />
        <Alert>
            {alert}
        </Alert>
    </section>
  )
}

export default Register
