
import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema({
    name:
        {
                type: String,
                required: true
        },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },
    Token: {type: String},

},{
    timestamps: true
})

export default mongoose.models.User || model('User', userSchema)