import { Schema, model } from "mongoose";

const directorSchema = new Schema({
    name:               String,
    gender:             String,
    nationality:        String,
    imgURL:             String,
    age:                Number,
    oscars:             Number,
    movies:             [{ref: 'Movie', type: Schema.Types.ObjectId, required: true}],
    shows:              [{ref: 'Show', type: Schema.Types.ObjectId, required: true}],
},{
    timestamps: true,
    versionKey: false
})

export default model('Director', directorSchema)