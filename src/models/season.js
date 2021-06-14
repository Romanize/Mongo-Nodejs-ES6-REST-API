import { Schema, model, now } from "mongoose";

const seasonSchema = new Schema({
    seasonNumber:       {type: Number, min : 0 , max: 100, required: [true, 'Need to provide season number']},
    show:               {type: Schema.Types.ObjectId, ref: 'Show', required: [true, 'Need to provide show ID']},
    imgURL:             {type: String, required: [true, 'Photo URL Required']},
    chapters:[{
        chapterNumber:  {type: Number, min : 0 , max: 100, required: [true, 'Need to provide chapter number']},
        name:           {type: String, required: [true, 'Name Required']},
        rating:         {type: Number, min : 0 , max: 10, default: 0}, //No required,
        director:       {ref: 'Director', type: Schema.Types.ObjectId, required: [true, 'Director ID Required']},
        airedAt:        {type: Date, min: '1950-01-01', max: now()} //No required
    }]
})

export default model('Season', seasonSchema)