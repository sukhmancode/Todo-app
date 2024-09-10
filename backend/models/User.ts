import mongoose, { Schema ,Document} from "mongoose";

interface Iuser extends Document {
    username:string,
    email:string,
    password:string
}

const UserSchema:Schema = new Schema({
    username: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true
    }
})
const User = mongoose.model<Iuser>("User",UserSchema)
export default User