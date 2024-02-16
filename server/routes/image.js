import {  imageDelete, imageDownload, imageGet, imagePost } from "../controller/image.js";
import express from "express";


const router = express.Router();

router.post("/imageget",imageGet)

router.post("/imagepost",imagePost)

router.post("/imagedownload",imageDownload)

router.post("/imagedelete",imageDelete)


export default router;