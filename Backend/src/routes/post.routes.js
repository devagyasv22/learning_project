import { Router } from "express";
import {createPost,getposts} from "../controller/post.controller.js";

const router = Router();

router.post('/create', createPost)
router.get('/getposts', getposts)
export default router;

