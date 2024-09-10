import mongoose,{Document, Schema, Types} from "mongoose";

interface ITodo extends Document {
    todo:string,
    isDone:boolean,
    user:Types.ObjectId
}
const TodoSchema:Schema = new Schema({
    todo:{
        type:String,
        required:true,
        trim:true
    },
    isDone: {
        type:Boolean,
        default:false
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
const Todo = mongoose.model<ITodo>("TODO",TodoSchema)
export default Todo