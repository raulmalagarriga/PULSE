import {Request, Response} from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../services/users.services';
import { IUser } from '../models/users.models';
import { encryptString } from '../utils/security';

// Business logic here
export const getUsersController = async (req: Request, res: Response) : Promise<void> => {
    const users: IUser[] = await getUsers();
    res.status(200).json({users});
};
export const getUserByIdController = async(req: Request, res: Response) : Promise<void> => {
    const id: string = req.params.id;
    const user: IUser | null = await getUserById(id);
    if(user){
        res.status(200).json({user});
    }else{
        res.status(404).json({message: 'User not found'});
    }
    return;
};
export const createUserController = async(req: Request, res: Response) : Promise<void> => {
    const user: IUser = req.body;
    const encrypted = encryptString(user.password);
    user.password = encrypted;
    const resp = await createUser(user);
    if(resp == null){
        res.status(400).json({message: 'Email or username is already in use'});
        return;
    }
    res.status(201).json({message: 'User created' , user});
    return;
};
export const updateUserController = async(req: Request, res: Response) : Promise<void> => {
    const id: string = req.params.id;
    const data: IUser = req.body;
    const resp = await updateUser(id, data);
    if(resp){
        res.status(200).json({message: 'User updated', user: data});
    }else{
        res.status(404).json({message: 'User not found'});
    }
    return;
};
export const deleteUserController = async(req:Request, res:Response) : Promise<void> => {
    const id: string = req.params.id;
    const resp = await deleteUser(id);
    if(resp){
        res.status(200).json({
            message: `User ${id} deleted`,
        });
    }else{
        res.status(404).json({message: 'User not found'});
    }
    return;
};