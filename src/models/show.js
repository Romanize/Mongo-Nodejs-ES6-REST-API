import { Schema, model } from "mongoose";

const showSchema = new Schema({
    name:               {type: String, required: [true, 'Name Required']},
    actors:             [{
                            ref: 'Actor', type: Schema.Types.ObjectId, 
                            required: [true, 'Actors ID Required'], 
                            minlenght: [1, "Add at least 1 actor"]
                        }],
    directors:          [{ref: 'Director', type: Schema.Types.ObjectId, default: [] }], //No required
    imgURL:             {type: String, required: [true, 'Photo URL Required']},
    year:               {type: Number, min : 1900 , max: 2050, required: [true, 'Year is required']},
    rating:             {type: Number, min : 0 , max: 10, default: 0}, //No required
    seasons:            [{ref: 'Season', type: Schema.Types.ObjectId, default: [] }]
},{
    timestamps: true,
    versionKey: false
})

export default model('Show', showSchema)