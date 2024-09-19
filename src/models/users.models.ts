import { required } from "joi";
import mongoose , {Schema, Document} from "mongoose";

export enum TypeUser {
    Admin, // 0
    Trainer, // 1
    Client // 2
}

// Address SCHEMA
export interface Address{
    country:string,
    state:string,
    zipCode:string,
    city:string
}

// USER MODEL
export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    profileImage:string,
    salt:string,
    fullname: string;
    type: TypeUser
    createdAt: Date,
    address:Address[]
};
const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profileImage:{type:String, required:false},
    salt:{type:String, require:true},
    fullname: {type: String, required: true},
    type: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    address:[],
});

export default mongoose.model<IUser>('User', userSchema);