import { Schema, model } from "mongoose";

const actorSchema = new Schema({
    name:           String,
    gender:         String,
    nationality:    String,
    imgURL:         String,
    age:            Number,
    oscars:         Number,
    movies:         [{ref: 'Movie', type: Schema.Types.ObjectId}],
    shows:          [{ref: 'Show', type: Schema.Types.ObjectId}],
},{
    timestamps: true,
    versionKey: false
})

export default model('Actor', actorSchema)