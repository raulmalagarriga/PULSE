import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
let conn:string = process.env.MONGO_CONN!;

const connectDB = async () => {
    try {
        console.log(conn);
        await mongoose.connect(conn);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    };

export default connectDB;