import mongoose,{Document,Types,Schema} from "mongoose";

interface IBlog extends Document{
    userId:Schema.Types.ObjectId,
    title:string,
    description:string,
    isDelete:boolean,
    images:string[]|null
}

const blogSchema = new Schema<IBlog>({
    
    userId:{ type:Types.ObjectId, ref:"User", required:true },
    
    title:{title:String, required:true},
    
    description:{type:String, required:true},
    
    images:{type:[String],default:[]}

},{timestamps:true});

const blogModel= mongoose.model<IBlog>("Blog",blogSchema);
export default blogModel