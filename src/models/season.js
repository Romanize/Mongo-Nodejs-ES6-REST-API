import { Schema, model, now } from "mongoose";

const seasonSchema = new Schema({
    seasonNumber:       Number,
    show:               {type: Schema.Types.ObjectId, ref: 'Show'},
    imgURL:             String,
    chapters:[{
        chapterNumber:  Number,
        name:           String,
        rating:         Number,
        director:       {ref: 'Director', type: Schema.Types.ObjectId},
        airedAt:        {type: Date, min: '1950-01-01', max: now}
    }]
})

export default model('Season', seasonSchema)