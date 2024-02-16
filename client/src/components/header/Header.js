import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from "./header.module.css"
import { ContextProvider } from '../../App'

const Header = () => {

    const {setLogin} = useContext(ContextProvider)

  return (
    <header className={classes.header} >
        <Link to={"/"} className={classes.logo} >Logo </Link>
        <h3>Now only for images</h3>
        <h2 onClick={() => {localStorage.clear(); window.location.reload()}} >Logout</h2>
    </header>
  )
}

export default Header