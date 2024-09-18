import { Types } from "mongoose";
import trainer from "../models/trainer.models";
import user from "../models/users.models";
import { ITrainer } from "../models/trainer.models";
import { TypeUser } from "../models/users.models";

export const createTrainer = async (trainerData: ITrainer) : Promise<ITrainer | null> => {
    try{
        // Search user data before create the trainer
        const UserData = await user.findById(trainerData.userId);
        if(UserData?.type != TypeUser.Trainer){
            return null;
        }
        if (!Types.ObjectId.isValid(trainerData.userId)) {
            return null;
        }
        const newTrainer = new trainer(trainerData);
        await newTrainer.save()
        return newTrainer;
    }catch (err){
        throw err;
    }
}

export const getTrainers = async () : Promise<ITrainer[]> => {
    try{
        const trainers = await trainer.find();
        return trainers;
    }catch (err) {
        throw err;
    }
}

export const getTrainerById = async (id:string) : Promise<ITrainer | null> => {
    try{
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }
        const trainerById = await trainer.findById(id);
        return trainerById;
    }catch (err){
        throw err;
    }
}