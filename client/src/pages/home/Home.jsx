import React, { useContext, useEffect, useState } from 'react'
import classes from "./home.module.css"
import axios from "axios"
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"
import app from '../../firebase'
import {saveAs} from "file-saver";
import Bg from '../../components/bg/Bg'
import { ContextProvider } from '../../App'
import Alert from '../../components/alert/Alert'

const Home = () => {

  const {setComfirmBtn,comfirmInput,setComfirmInput,alert,setAlert} = useContext(ContextProvider)

  const [img,setImg] = useState(undefined)
  const [imgPerc,setImgPerc] = useState(0);
  const [inputs,setInputs] = useState({})
  const [imageData,setImageData] = useState([])
  const [rdata,setrdata] = useState(0)
  




  



  useEffect(()=>{
      img && uploadFile(img, 'imgUrl')
  },[img])

  const uploadFile = (file,fileType) =>{
      const storage = getStorage(app);
      const folder =  "images/";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef,file)

      // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
fileType === "imgUrl" && setImgPerc(Math.round(progress)) 
switch (snapshot.state) {
  case 'paused':
    console.log('Upload is paused');
    break;
  case 'running':
    console.log('Upload is running');
    break;
}
}, 
(error) => {
// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors
switch (error.code) {
  case 'storage/unauthorized':
    // User doesn't have permission to access the object
    break;
  case 'storage/canceled':
    // User canceled the upload
    break;

  // ...

  case 'storage/unknown':
    // Unknown error occurred, inspect error.serverResponse
    break;
}
}, 
() => {
// Upload completed successfully, now we can get the download URL
getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  console.log('File available at', downloadURL);

  setInputs((prev) => {
      return {
          ...prev,
          [fileType]:downloadURL
      }
  })

});
}
);

  }

  const getData = async () =>{

    await axios.post("http://localhost:5000/user/imageget",{username:localStorage.getItem("name")}).then((resp)=>{
      setImageData(resp.data.result)
    }).catch((err)=>{
      console.log(err);
    })

  }


  useEffect(()=>{
    getData()
  },[rdata])



  const submitImage = async (e) =>{ 
    e.preventDefault();
    try{
        await axios.post("http://localhost:5000/user/imagepost",{...inputs,username:localStorage.getItem("name")});
        // window.location.reload();
        setImg(undefined)
        setImgPerc(0)
        setrdata(prev => prev + 1)
        setInputs({})
    }catch(err){
        console.log(err);
    }
  }




   const comfirmDownload = async (url) =>{
    try{
      await axios.post("http://localhost:5000/user/imagedownload",{username:localStorage.getItem("name"),password:comfirmInput}).then((resp)=>{
        console.log();

        if (resp.data.result === true) {
          saveAs(url, "image.png" || "image.jpg" || "image.jpeg" );
          setComfirmInput("")
          setComfirmBtn(null)
        }else{
          // alert("wrong password")
          setAlert("Wrong Password")
          setComfirmInput("")
        }

      }).catch((err)=>{
        console.log(err);
      })
      // window.location.reload();
      
  }catch(err){
      console.log(err);
  }
   }

   const comfirmDelete = async (_id) =>{

    console.log(_id);

    try{
      await axios.post("http://localhost:5000/user/imagedelete",{username:localStorage.getItem("name"),password:comfirmInput,_id:_id}).then((resp)=>{
        console.log(resp.data.result);

        if (resp.data.result === true) {
          setComfirmInput("")
          setComfirmBtn(null)
          setrdata(prev => prev + 1)
        }else{
          // alert("wrong password")
          setAlert("Wrong Password")
          setComfirmInput("")
        }

      }).catch((err)=>{
        console.log(err);
      })
      
  }catch(err){
      console.log(err);
  }
   }




  return (
    <section className={classes.home_conatiner}>
      <Alert>
        {alert}
      </Alert>
      <ul> 
        <li className={classes.drag} >   
         <form onSubmit={submitImage} >  <input className={classes.inputimg} type='file' accept='image/' onChange={(e) => {setImg(e.target.files[0])}}  /> {imgPerc == 100 ?  <button className={classes.sendbtn} type='submit' >Send</button> : <p>{imgPerc > 0 ?  "Uploading: " + imgPerc + "%" : "Drag And drop" }</p> } </form>
         
          <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M10 14H12M12 14H14M12 14V16M12 14V12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" stroke="#1C274C" strokeWidth="1.5"></path> </g></svg>   </li>
          {imageData?.map((i)=>(
            <React.Fragment key={i._id}>
            <li  ><img src={i.image} alt='' /> <div className={classes.btns} > <button onClick={() =>{setComfirmBtn(1)}}   >Download</button> <button onClick={() =>{setComfirmBtn(2)}} >Delete</button> </div>  </li>
          <Bg data={1} >
            <div className={classes.confirm_container} >
              <h2>Enter Password</h2>
              <input type='text' placeholder='*****' value={comfirmInput} onChange={(e)=>{setComfirmInput(e.target.value)}} />
              <button onClick={()=>{comfirmDownload(i.image)}} >DOWNLLOAD</button>
            </div>
          </Bg>
          <Bg data={2} >
            <div className={classes.confirm_container} >
              <h2>Enter Password</h2>
              <input type='text' placeholder='*****' value={comfirmInput} onChange={(e)=>{setComfirmInput(e.target.value)}} />
              <button onClick={()=>{comfirmDelete(i._id)}} >DELETE</button>
            </div>
          </Bg>
            </React.Fragment>
          ))}
            

            
      </ul>
    </section>
  )
}

export default Home


// const [imageReload,setImageReload] = useState(0)
// const [imageData,setImageData] = useState([])
// const [validateImg,setValidateImage] = useState('')



// const [img,setImg] =useState("")



// console.log(validateImg);



// const covenvertBase64 = (e) =>{
//   setValidateImage(e.target.files[0]);
//   var reader = new FileReader();
//   reader.readAsDataURL(e.target.files[0]);
//   reader.onload = () =>{
//     // console.log(reader.result);
//     setImg(reader.result)
//   };
//   reader.onerror = error =>{
//     console.log("error",error);
//   }
// }

// const getImage = async () =>{
//   await axios.post("http://localhost:5000/user/imageget",{username:localStorage.getItem("name")}).then((resp)=>{
//     console.log(resp.data.result);

//     setImageData(resp.data.result)
//   }).catch(err=>{
//     console.log(err);
//   })

// }



// const sendImage = async () =>{

//   if (validateImg.type.includes("image")) {
//     await axios.post("http://localhost:5000/user/imagepost",{username:localStorage.getItem("name"),image:img}).then((resp)=>{
//     console.log(resp);
//     if (resp.status === 201) {
//       setImageReload(prev => prev + 1)
//       setImg('')
//     }
//   }).catch(err=>{
//     console.log(err);
//   })
//   }else{
//     alert("please select valid image")
//   }
  
// }


// useEffect(()=>{

//   getImage()

// },[imageReload])