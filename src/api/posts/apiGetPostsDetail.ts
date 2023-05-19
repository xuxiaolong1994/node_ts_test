import { DataStore } from '../../data/data.js';
import { RequestHandler } from 'express';
import { PostSummary } from '../../model/run-acorn/entity/postSummary.js';





export const apiGetPostsDetail: RequestHandler = (req, res) => {
    const selectedPost = DataStore.posts.find((it: any) => it.id == req.params.id)
    if (selectedPost) {
        res.json(new PostSummary(selectedPost))
    } else {
        res.status(404).json({ status: 'failed', message: 'post not found' })
    }


    // DataStore.posts.forEach((it: any) => {
    //     if (it.id == req.params.id) {
    //         res.json(new PostSummary(it));
    //     }
    // })
};



