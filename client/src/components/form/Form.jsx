import React, { useContext } from 'react'
import classes from "./form.module.css"
import { Link } from 'react-router-dom'
import { ContextProvider } from '../../App'
const Form = (props) => {

  const {alert,setAlert} = useContext(ContextProvider)

  return (
    <>
    <div className={classes.container} >
            <form onSubmit={props.submitHandler} style={{borderColor: alert && "red"}} >
                <h1>{props.heading}</h1>
                <input type="text" placeholder="Username" name='username' style={{borderColor: alert && "red"}} value={props.data.username} onChange={props.changeHandler} />
                <input type="password" placeholder="Password" name='password' style={{borderColor: alert && "red"}} value={props.data.password} onChange={props.changeHandler} />
                <button style={{borderColor: alert && "red"}} type='submit' >Submit</button>
                <Link to={props.head_url} >{props.another_link}</Link>
            </form>
        </div>
    </>
  )
}

export default Form