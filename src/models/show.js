import { Schema, model } from "mongoose";

const showSchema = new Schema({
    name:               String,
    actors:             [{ref: 'Actor', type: Schema.Types.ObjectId, required: true}],
    directors:          [{ref: 'Director', type: Schema.Types.ObjectId, required: true}],
    imgURL:             String,
    rating:             Number,
    year:               Number,
    seasons:            [{ref: 'Season', type: Schema.Types.ObjectId, required: true}]
},{
    timestamps: true,
    versionKey: false
})

export default model('Show', showSchema)