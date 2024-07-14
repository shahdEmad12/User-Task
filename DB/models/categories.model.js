import mongoose , {Schema, model} from 'mongoose'
const categorySchema = new Schema({
    name:
        {
        type: String,
        unique: true,
        required: true
        },
    userID:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps: true
})

const Category = model('Category', categorySchema)
export default Category