import { Schema, model } from "mongoose";

const subject = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String, 
        required: false
    },
    dep: {
        type: Schema.Types.ObjectId,
        required: false ,
        ref:'Department'
    },
    pre_req: {
        type: String,
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'user',
    }
},{timestamps: true} )





export default model('subject', subject)