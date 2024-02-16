import React, { useContext, useEffect } from 'react'
import classes from "./alert.module.css"
import { ContextProvider } from '../../App'

const Alert = (props) => {

    const {alert,setAlert} = useContext(ContextProvider)

    useEffect(()=>{
        var x = setTimeout(()=>{
            setAlert(null)
        },3000)

        return () =>{
            clearTimeout(x)
        }
    },[alert])


  return (
    <>
    {alert && 
    <div className={classes.alert} >{props.children}</div>}
    </>
  )
}

export default Alert