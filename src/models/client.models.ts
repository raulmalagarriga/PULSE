import mongoose, {Schema, Document, Types} from "mongoose";

// BODY MESUREMENT SCHEMA
export interface BodyMeasurements {
    date: Date,
    weight: number,
    weightMetric: string,
    waist: number
}
const BodyMeasurementsSchema: Schema = new Schema({
    date: {type: Date, default: Date.now},
    weight: {type: Number, required: true},
    weightMetric: {type: Number, required: true},
    waist: {type: Number, required: true}
}, {_id: false});

export interface IClient extends Document{
    userId: Types.ObjectId,
    fullname: string,
    category: Types.ObjectId
    createdAt: Date,
    paydate: Date
    measurements: BodyMeasurements[],
};

// CLIENT SCHEMA
const clientSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    fullname: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    createdAt: {type: Date, default: Date.now},
    payDate: {type: Date, default: Date.now},
    measurements: [BodyMeasurementsSchema]
});

export default mongoose.model<IClient>('Client', clientSchema);