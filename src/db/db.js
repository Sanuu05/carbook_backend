const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://sanz:sannu05@cluster0.s5xci.mongodb.net/carb?retryWrites=true&w=majority", {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("db failed",err)
})



