import mongoose, {Schema, Document, Types} from "mongoose";


// Previous Injuries
interface IPreviousInjury {
    Date: string; 
    Name: string;
  }
  
  
  // Current Medications
  interface ICurrentMedication {
    Name: string;
    Date: string; 
    Description: string;
  }
  
  //  Medical History
 export interface IMedicalHistory extends Document {
    Chronic_illnesses: string[];
    Previous_injuries: IPreviousInjury[];
    Allergies: string[];
    cardiacOrRespiratoryConditions: boolean;
    Current_medications: ICurrentMedication[];
  }

// Previous Injuries
  const PreviousInjurySchema = new Schema({
    Date: { type: String, required: true },
    Name: { type: String, required: true },
  }, { _id: false });
  

  
  // Current Medications
  const CurrentMedicationSchema = new Schema({
    Name: { type: String, required: true },
    Date: { type: String, required: true },
    Description: { type: String, required: true },
  }, { _id: false });

 
  //  Medical History SCHEMA
const MedicalHistorySchema = new Schema({
    Chronic_illnesses: {
      type: [String], 
      required: true,
    },
    Previous_injuries: {
      type: [PreviousInjurySchema],
      required: true,
    },
    Allergies: {
      type: [String],
      required: true,
    },
    cardiacOrRespiratoryConditions: {
      type: Boolean, 
      required: true,
    },
    Current_medications: {
      type: [CurrentMedicationSchema], 
      required: true,
    },
  }, {
    timestamps: true 
  });
  
// BODY MESUREMENT SCHEMA
export interface IBodyMeasurements {
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


// Interface for CurrentFitnessLevel
interface ICurrentFitnessLevel {
    PreviousSportsExperience: 'Beginner' | 'Intermediate' | 'Advanced'; // Enum with three possible values
    previousTrainingTypes: string;
    currentTrainingFrequency: number;
  }

  // Interface for short, medium, and long-term goals
interface IGoals {
    short: string;
    medium: string;
    longTerm: string; 
  }
  
  // Interface for FitnessGoals
  interface IFitnessGoals {
    GoalsTimeframe: string; 
    shortMediumLongTermGoals: IGoals;
  }

  const CurrentFitnessLevelSchema: Schema = new Schema({
    PreviousSportsExperience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'], // Defines enum options
      default: 'Beginner',
      required: true,
    },
    previousTrainingTypes: {
      type: String,
      required: true,
    },
    currentTrainingFrequency: {
      type: Number,
      required: true,
    },
  }, { _id: false });

  const GoalsSchema: Schema = new Schema({
    short: { type: String, required: true },
    medium: { type: String, required: true },
    longTerm: { type: String, required: true }, // Renamed "long-term" to "longTerm"
  }, { _id: false });
  
  // Subschema for FitnessGoals
  const FitnessGoalsSchema: Schema = new Schema({
    GoalsTimeframe: { type: String, required: true }, // Assuming it's a string with date format
    shortMediumLongTermGoals: { type: GoalsSchema, required: true }, // Embeds the Goals subschema
  }, { _id: false });
  
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
    measurements: IBodyMeasurements[],
    medicalHistory: IMedicalHistory, 
    currentFitnessLevel:ICurrentFitnessLevel
    fitnessGoals:IFitnessGoals
};

// CLIENT SCHEMA
const clientSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    fullname: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    createdAt: {type: Date, default: Date.now},
    payDate: {type: Date, default: Date.now},
    measurements: [BodyMeasurementsSchema],
    medicalHistory: MedicalHistorySchema,
    currentFitnessLevel: CurrentFitnessLevelSchema, // Adds the CurrentFitnessLevel subschema
    fitnessGoals: FitnessGoalsSchema, // Adds the FitnessGoals subschema

});

export default mongoose.model<IClient>('Client', clientSchema);