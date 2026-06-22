import mongoose,{Document,Types,Schema} from "mongoose";
type CONTENT_DELTA_TYPE={"ops":unknown[]};

export interface IBlog extends Document{
    
    title:string,
    contentHtml:string,
    contentDelta:CONTENT_DELTA_TYPE,

    isDelete:boolean,
    userId:Schema.Types.ObjectId,                                                       

}

const blogSchema = new Schema<IBlog>({
    
    userId:{ type:Types.ObjectId, ref:"User", required:true },
    
    title:{title:String, required:true},
    
    contentHtml:{type:String, required:true},
    
    contentDelta:{type:Object,default:{}},

    isDelete : {type:Boolean, default:false},

},{timestamps:true});

const blogModel= mongoose.model<IBlog>("Blog",blogSchema);
export default blogModel