import mongoose, {Schema, model} from 'mongoose'
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'list'],
        required: true,
    },
    textTask: {
        type: String,
    },
    listTask: [{
        type: String
    }],
    shared: {
        type: Boolean,
        default: 'false'
    },
    status:{
        type: String,
        enum:['toDo','doing','done'],
        default: 'toDo'
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    categoryID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },



},{
    timestamps: true
})

const Task = model('Task', taskSchema)
export default Task