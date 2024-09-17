import mongoose, {Schema, Document, Types} from "mongoose";

// BODY MESUREMENT SCHEMA
export interface BodyMeasurements {
    date: Date,
    weight: number,
    weightMetric: string, // Kg or Lbs
    longitudeMetric: string, // Cm or inch
    waistAnchor: number, // cintura en la parte mas ancha
    waistNarrow: number, // cintura en la parte mas angosta
    neck: number, // cuello
    rightArm: number, // brazo der
    leftArm: number, // brazo izq
    ribCageWitShoulders: number, // Caja torácica tomando en cuenta hombros
    ribCageWithoutShoulders: number, // Caja torácica sin hombros
    buttocks: number, // Gluteos
    rightThigh: number // Muslo derecho
    leftThigh: number, // Muslo izquierdo
    rightCalf: number // Pantorrilla derecho
    leftCalf: number, // Pantorrilla izquierdo
}
const BodyMeasurementsSchema: Schema = new Schema({
    date: {type: Date, default: Date.now},
    weight: {type: Number, required: true},
    weightMetric: {type: Number, required: true},
    waistAnchor: {type: Number, required: true},
    waistNarrow: {type: Number, required: true},
    neck: {type: Number, required: true},
    rightArm: {type: Number, required: true},
    leftArm: {type: Number, required: true},
    ribCageWitShoulders: {type: Number, required: true},
    ribCageWithoutShoulders: {type: Number, required: true},
    buttocks: {type: Number, required: true},
    rightThigh: {type: Number, required: true},
    leftThigh: {type: Number, required: true},
    rightCalf: {type: Number, required: true},
    leftCalf: {type: Number, required: true},
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