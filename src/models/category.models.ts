import mongoose, {Schema, Document, Types} from "mongoose";

export interface ICategory extends Document{
    trainerId: Types.ObjectId,
    name: string
};

const categorySchema: Schema = new Schema({
    trainerId: {type: Schema.Types.ObjectId, ref: 'Trainer', required: true},
    name : {type: String, required: true}
});

export default mongoose.model<ICategory>('Category', categorySchema);