import { Schema, model } from "mongoose";

const directorSchema = new Schema({
    name:               {type: String, required: [true, 'Name Required']},
    gender:             {type: String, enum : ["male", "female"]}, //No required
    nationality:        {type: String, required: [true, 'Nationality Required']},
    imgURL:             {type: String, required: [true, 'Photo URL Required']},
    age:                {type: Number, min : 0 , max: 130, required: [true, 'Age is required']},
    oscars:             {type: Number, min : 0 , max: 100, required: [true, 'Number of oscars won is required']},
    movies:             [{ref: 'Movie', type: Schema.Types.ObjectId, required: true}], //Possible empty Array
    shows:              [{ref: 'Show', type: Schema.Types.ObjectId, required: true}], //Possible empty Array
},{
    timestamps: true,
    versionKey: false
})

export default model('Director', directorSchema)