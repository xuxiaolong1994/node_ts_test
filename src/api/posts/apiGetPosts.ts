import { DataStore } from '../../data/data.js';
import { RequestHandler } from 'express';
import { PostSummary } from '../../model/run-acorn/entity/postSummary.js';


export const apiGetPosts: RequestHandler = (req, res) => {
    res.json(DataStore.posts.map((it: any) => new PostSummary(it)));
};





