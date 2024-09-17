import mongoose, {Schema, Document, Types} from "mongoose";

export interface ITrainer extends Document{
    userId: Types.ObjectId,
    clients: Types.ObjectId[], // Array of ObjectId
    fullname: string,
    createdAt: Date,
    subscriptionDate: Date,
};

const trainerSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    clients: [{type: Schema.Types.ObjectId, ref: 'Client'}],
    fullname: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    subscriptionDate: {type: Date, default: Date.now}
});

export default mongoose.model<ITrainer>('Trainer', trainerSchema);