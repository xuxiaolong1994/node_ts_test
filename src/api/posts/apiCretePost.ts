import { DataStore } from '../../data/data.js';
import { RequestHandler } from 'express';
import { PostSummary } from '../../model/run-acorn/entity/postSummary.js';
import { APIError, PublicInfo } from '../../model/run-acorn/entity/message.js';


export const apiCretePost: RequestHandler = (req, res, next) => {

    console.log(req.body);
    const requireFields = ['title', 'body'];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requireFields.every(field => givenFields.includes(field))) {
        return next(new APIError("Data misssing", "not all requied fields supplied", 400))
    }
    res.json(new PublicInfo('post added', 200, req.body))
};





