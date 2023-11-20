import {model, Schema} from "mongoose";

const ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true,
         min:[1,"should be more than 1"]
    },
     description:{
        type:String,
        required:true
    },

    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    discountedPercentage:{
        type:Number,
        required:true
    },


     imageUrl:{
        type:String,
        required:true
    },
     stock:{
        type:Number,
        required:true,
         min:[0,"Stock can't be lower than 0"]
    },

})
export const ProductModel = new model("products",ProductSchema)