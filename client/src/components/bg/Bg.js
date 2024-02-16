import React, { useContext } from 'react'
import classes from "./bg.module.css"
import { ContextProvider } from '../../App'

const Bg = (props) => {

  const {comfirmBtn,setComfirmBtn,setComfirmInput} = useContext(ContextProvider)

  const clear = () =>{
    setComfirmBtn(null); 
    setComfirmInput('');
  }


  return (
    <>
    {comfirmBtn  && comfirmBtn === props.data && <div className={classes.bg}   >
      <div className={classes.a} onClick={clear} >

      </div>
    {props.children}
</div>}
    </>
  )
}

export default Bg