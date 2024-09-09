import mongoose,{Schema} from "mongoose";

const TransactionSchema = new Schema({
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    issuedBook: {
        type: Schema.Types.ObjectId,
        ref: 'Books', // Reference to the Book model
        required: true
    },rent :{
        type: Number,
        default : null
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        default : null
    },
    
    status:{
        type : String,
        enum: ['Issued', 'Returned'],
        required: true
    }
}, {
    timestamps: true
});

export const Transaction = mongoose.model('Transaction',TransactionSchema)