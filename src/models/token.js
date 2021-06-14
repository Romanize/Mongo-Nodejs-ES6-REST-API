import { Schema , model } from 'mongoose'

const tokenSchema = new Schema ({
    userId:             { type:Schema.Types.ObjectId, required: [true, 'User ID missing']},
    refreshToken:       { type:String, required: [true, 'Token missing']}
},{
    timestamps: true
})

export default model( 'Token' , tokenSchema )