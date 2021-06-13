import { Schema , model } from 'mongoose'

const tokenSchema = new Schema ({
    userId:             {type:String,required: true},
    refreshToken:       {type:String,required: true}
},{
    timestamps: true
})

export default model( 'Token' , tokenSchema )