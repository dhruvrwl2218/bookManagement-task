import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
   
    userName :{
        type : String,
        required : true,
        trim : true,
        minlength: 3, 
        maxlength: 50 
    }
},{
    timestamps: true // Optional: Adds createdAt and updatedAt timestamps
})
export const User = mongoose.model('User',UserSchema)