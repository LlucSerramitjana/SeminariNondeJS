import {Schema, model} from 'mongoose';

const PostSchema = new Schema({
    id: {type:String, required:true},
    name: {type: String, required:true},
    age: {type: String, required:true},
    creationDate: {type: Date, default:Date.now}
})
export default model('Post', PostSchema);