import mongoose from 'mongoose';
import 'dotenv/config'
import { ApiError } from '../utils/apiError.js';

export let dbInstance = undefined;//will be of type mongoose | undifend

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}`
        );
        dbInstance = connectionInstance;
        console.log("db connected sucessfully")
    } catch (error) {
        console.log("db connection error:",error);
        throw new ApiError('db Connection Error:',error);
    }
}
export default connectDB;  