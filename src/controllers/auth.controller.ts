import {Request, Response} from 'express';
import { IUser } from '../models/users.models';
import { encryptString, generateToken } from '../utils/security';
import { authUser } from '../services/auth.services';

// Business logic here

export const authUserController = async(req: Request, res: Response) : Promise<void> => {
    const user: IUser = req.body;
    const encrypted = encryptString(user.password);
    user.password = encrypted;
    const resp = await authUser(user);
    // console.log(resp)
    if(resp){
        const uid = (resp._id as string);
        console.log(uid)
        const token = generateToken(uid)
        res.status(200).json({message: `User ${resp.fullname} is authenticated`, data: { _id: uid, username: resp.username, fullName: resp.fullname, email: resp.email, token }});
    }else{
        res.status(404).json({message: 'User not found'});
    }
    return;
};
