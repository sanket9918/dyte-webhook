import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("MongoDB connected for User");

}).catch((err) => {
    console.log(err);

})