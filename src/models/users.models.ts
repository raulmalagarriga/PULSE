import mongoose , {Schema, Document} from "mongoose";

enum TypeUser {
    Admin, // 0
    Trainer, // 1
    Client // 2
}
// USER MODEL
export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    fullname: string;
    type: TypeUser
};
const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    fullname: {type: String, required: true},
    type: {type: Number, required: true}
});

export default mongoose.model<IUser>('User', userSchema);