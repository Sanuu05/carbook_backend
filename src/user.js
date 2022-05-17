const express = require("express")
const app = express()
const route = express.Router()
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const Group = require('../models/group')
const auth = require('./middleware/auth')


// signup 


route.post('/signup', async (req, res) => {
    try {
        const { name, email} = req.body
        console.log('ssss',req.body)


        const userRes = new User({
            name,
            email

        })
        // console.log("hash", userRes)
        const userSave = await userRes.save()
        // console.log("save", userSave)
        res.json(userSave)
    } catch (error) {
        console.log("err1",error)
    }
})

// login 

route.post('/login', async (req, res) => {
    try {
        const { email} = req.body
        console.log('log',email)
        const exuser = await User.findOne({ email })
       
        const token = await jwt.sign({ id: exuser._id },process.env.SEC_KEY)
        res.json({
            token,
            user: exuser
        })
    } catch (error) {
        console.log("err2",error)
    }

})
route.get('/getuser',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user)
        res.json(user)
    } catch (error) {
        
    }
})


module.exports = route