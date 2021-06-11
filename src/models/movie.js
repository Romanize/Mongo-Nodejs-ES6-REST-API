import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    name: String,
    director: {ref: 'Director', type: Schema.Types.ObjectId},
    actors: [{ref: 'Actor', type: Schema.Types.ObjectId}],
    imgURL: String,
    rating: Number
},{
    timestamps: true,
    versionKey: false
})

export default model('Movie', movieSchema)