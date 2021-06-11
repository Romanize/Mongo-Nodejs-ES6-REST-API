import mongoose from 'mongoose'


//Connecting to local db
mongoose.connect("mongodb://localhost/fakeIMDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('DB is connected'))
    .catch(db => console.log('DB is connected'))
