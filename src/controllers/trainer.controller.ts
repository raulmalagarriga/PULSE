import { Request, Response } from "express";
import { ITrainer } from "../models/trainer.models";
import { createTrainer, getTrainerById, getTrainers } from "../services/trainer.services";
import { IUser } from "../models/users.models"; 

export const getTrainersController = async (req: Request, res: Response) : Promise<void> => {
    const trainers : ITrainer[] = await getTrainers();
    res.status(200).json({trainers});
};

export const getTrainerByIdController = async (req: Request, res: Response) : Promise<void> => {
    const id: string = req.params.id;
    const trainer: ITrainer | null = await getTrainerById(id);
    if(trainer){
        res.status(200).json({trainer});
    }else{
        res.status(404).json({message: 'Trainer not found'});
    } 
};

export const createTrainerController = async (req: Request, res: Response) : Promise<void> => {
    const trainer: ITrainer = req.body;
    const response = await createTrainer(trainer);
    if(response == null){
        res.status(400).json({message: 'Invalid user type or user ID'});
    }
    res.status(200).json({message: 'Trainer created', trainer});
};
