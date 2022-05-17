const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("db failed",err)
})



