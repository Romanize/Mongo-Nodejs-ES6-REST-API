import { Schema, model } from "mongoose";

const seasonSchema = new Schema([
    [{
        name:           String,
        rating:         Number,
        director:       {ref: 'Director', type: Schema.Types.ObjectId},
    }]
])

const showSchema = new Schema({
    name:               String,
    actors:             [{ref: 'Actor', type: Schema.Types.ObjectId, required: true}],
    imgURL:             String,
    rating:             Number,
    year:               Number,
    seasons:            seasonSchema
},{
    timestamps: true,
    versionKey: false
})

export default model('Show', showSchema)