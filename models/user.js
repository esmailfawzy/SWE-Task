import { Schema, model } from "mongoose";

const user = new Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        academicnumber: {
            type: String,
            required: true,
        },
        department: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "department",
        },
        student: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "user",
        }
    
    },

{timestamps: true}
);
export default model('user',user);
