import { Router } from "express";
import { apiCretePost } from "./apiCretePost.js";
import { apiGetPosts } from "./apiGetPosts.js";
import { apiGetPostsDetail } from "./apiGetPostsDetail.js";

export let postsRouter = Router();
postsRouter.get('/', apiGetPosts);
postsRouter.get('/:id', apiGetPostsDetail);
postsRouter.post('/', apiCretePost);