const express = require("express")
const app = express()
const route = express.Router()
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const Group = require('../models/group')
const auth = require('./middleware/auth')
// const multer = require('multer')
// const http = require('http')
// const socketio = require('socket.io')
// const shortid = require('shortid')
// const server = http.createServer(app)
// const io = socketio(server)


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../back/public/upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, shortid.generate() + "-" + file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// route.get("/", (req, res) => {
//     res.send("heloo from router side")
// })



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
       
        const token = await jwt.sign({ id: exuser._id },"yyuyuywedhssss77&^&^&YDSYYD&*T#^T^TDGDG#&Y&*Y&*RY#FH&*H&*HG&F*T^RGR#RG^R^G&R#&G")
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

//getuser

// route.get('/getuser', auth, async (req, res) => {
//     try {
//         const userRes = await User.findById(req.user)
//         if (!userRes) {
//             return res.status(400).json({
//                 msg: "not auth user"
//             })
//         }

//         const user = await User.find()

//         // console.log('alluer',userRes)
//         // const filuser = userRes?.msg?.map((v,i)=>{
//         //     return v?.user
//         // })
//         // const filmsguser= [... new Set(filuser)]
//         // console.log("fil",filuser)
//         // console.log("fil",filmsguser)
//         // const filteredArr = userRes?.msg?.reduce((acc, current) => {
//         //     const x = acc.find(item => item.sent == current.sent);
//         //     console.log('all',acc)
//         //     if (!x) {
//         //       return acc.concat([current]);
//         //     } else {
//         //       return acc;
//         //     }
//         //   }, []);
//         const arr = [{
//             id: 1,
//             name: 'sannu'
//         },
//         {
//             id: 2,
//             name: 'sannutwo'
//         },
//         {
//             id: 1,
//             name: 'sannunew'
//         }
//         ]

//         const fil = [... new Set(arr)]
//         // console.log('vvccxx',fil)
//         // const mapf = arr?.reduce((val,i)=>{

//         //     console.log("mnm",val)
//         // })

//         const mapv = userRes?.msg?.reverse()?.map((v,i)=>{
//             return v.user
//         })
       

//         // const filteru = [new Set(mapv)]
//         // console.log("vv",filteru)




//         function removeDuplicates(arr) {
//             var unique = arr.reduce(function (acc, curr) {
//                 if (!String(acc).includes(String(curr)))
//                     acc.push(curr);
//                 return acc;
//             }, []);
//             return unique;
//         }
      
//         console.log(removeDuplicates(mapv));

//         const iniquer = [...arr.reduce((map, obj) => map.set(String(obj.id), obj), new Map()).values()]
//         // console.log('eee', iniquer)
//         // const result = iniquer?.filter((val)=>{
//         //     return user.find((a)=>{
//         //         return String(a._id)===String(val)
//         //     })

//         // })
//         const result = removeDuplicates(mapv)?.map((v, i) => {
//             return user.find((a) => {
//                 return String(a._id) === String(v)
//             })
//         })
//         // console.log("user",result)
//         // console.log('all', userRes?.msg)
//         res.json({
//             user: userRes
//             ,
//             alluser:result
//         })


//     } catch (error) {
//         console.log("err3",error)
//     }
// })
// route.post('/editpic', auth, async (req, res) => {
//     try {
//         console.log('ll',req.user)
//         const {profilePic} = req.body
//         // console.log('body',req.body)

//         const user = await User.findByIdAndUpdate(req.user,req.body )
//         res.json(user)
//         req.io.emit("update", req.user);

//     } catch (error) {
//         console.log("err4",error)
//     }
// })
// route.post('/nmsg', auth, async (req, res) => {
//     try {
//         const { msg, sendid, pic } = req.body

//         console.log(req.body)
//         const selfuser = await User.findById(req.user)
//         const frnduser = await User.findById(sendid)
//         // const pics=""
//         // if(pic="undefined"){
//         //      pics =  ""
//         // }else{
//         //     pics= pic
//         // }
//         // console.log("pic", pics)
//         const sentmsg = {
//             text: msg,
//             user: frnduser,
//             sent: true,
//             pic: pic
//         }
//         // console.log(sentmsg)
//         const recmsg = {
//             text: msg,
//             user: selfuser,
//             sent: false,
//             pic: pic
//         }
//         const msgsent = await User.findByIdAndUpdate(req.user, {
//             $push: { msg: sentmsg },
//         }, {
//             new: true
//         })
//         if (msgsent) {
//             const msgrec = await User.findByIdAndUpdate(sendid, {
//                 $push: { msg: recmsg }
//             }, {
//                 new: true
//             })
//             // socket.emit('msgn', msgsent)
//             res.json({
//                 msgsent,
//                 msgrec
//             })
//             // socket.emit('msgn', msgsent)
//             // io.on('connection',(socket)=>{
//             //     console.log('connected sucess msg')
//             //     // socket.on('msgn',(msg)=>{
//             //     //     console.log(msg)
//             //     // })
//             // })
//             req.io.emit("new-message", {
//                 msg:msg===""|| msg===null?pic:msg,
//                 id:req.user,
//                 sid:sendid
//             });

//         }
//         res.json("sucessful")
//     } catch (error) {
//         console.log("err5",error)
//     }
// })
// route.post('/soc', async (req, res) => {
//     try {
//         const data = req.body
//         socket.emit('msgn', data)

//     } catch (error) {

//     }
// })
// route.put('/delmsg', auth, async (req, res) => {
//     try {
//         // console.log(req.body)
//         const { id } = req.body
//         console.log(req.body)
//         const del = await User.findByIdAndUpdate(req.user, {
//             $pull: {
//                 msg: {
//                     _id: id
//                 }
//             }
//         })
//         res.json(del)
//         req.io.emit("del-message", {
//             msgid:id,
//             id:req.user
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })
// route.post('/creategrp', async (req, res) => {
//     try {
//         const { name } = req.body
//         const grp = new Group({ name })
//         const savegrp = await grp.save()
//         res.json(savegrp)

//     } catch (error) {
//         console.log(error)
//     }
// })
// route.post('/addtogrp', auth, async (req, res) => {
//     try {
//         const text = "hi welcome"
//         const grp = await Group.findById(req.body.id)
//         const user = await User.findById(req.user)
//         user.msg = undefined
//         user.password = undefined
//         const sentmsg = {
//             text: text,
//             user: user,
//             sent: false,
//             grpuser: user

//         }
//         const newmsg = await Group.findByIdAndUpdate(req.body.id, {
//             $push: { msg: sentmsg },
//         }, {
//             new: true
//         })

//         res.json(newmsg)


//     } catch (error) {
//         console.log(error)
//     }
// })
// route.patch('/online', auth, async (req, res) => {
//     try {
//         console.log('online')
//         const onlineupdate = await User.findByIdAndUpdate(req.user, { "online": true })
//     } catch (error) {

//     }
// })
// route.patch('/offline', auth, async (req, res) => {
//     try {
//         console.log('offline')
//         const onlineupdate = await User.findByIdAndUpdate(req.user, { "online": false })
//     } catch (error) {

//     }
// })
// route.post('/msg', auth, async(req,res)=>{
//     try {
//         const {msg, sendid} = req.body
//         const sentuser = await User.findById(sendid)
//         const sent ={
//             text: msg,
//             to:sentuser
//         }
//         const recuser = await User.findById(req.user)
//         const received ={
//             text:msg,
//             by:recuser
//         }
//         const msgsent = await User.findByIdAndUpdate(req.user,{
//             $push:{sent},
//         },{
//             new:true
//         })
//         if(msgsent){
//             const msgrec= await User.findByIdAndUpdate(sendid,{
//                 $push:{received}
//             },{
//                 new:true
//             })
//             res.json({
//                 msgsent,
//                 msgrec
//             })

//         }
//         res.json("sucessful")

//     } catch (error) {
//         console.log(error)
//     }
// })

// route.get('/oneuser/:id', auth, async (req, res) => {
//     try {
//         // console.log(req.params.id)
//         const user = await User.findById(req.user).populate("received.by", "_id name").populate("sent.to", "_id name")
//         const usermain = await User.findById(req.params?.id)
//         // console.log("user",user)
//         // const grp = await Group.findById(req.params.id)
//         // console.log("saa",grp.user)

//         if (user) {
//             // console.log(req.user)
//             const msgr = await user.msg.filter((p) => p.user == req.params.id)
//             // const msgs = await user.sent.filter((p)=>p.to._id==req.params.id)
//             user.sent = undefined
//             user.received = undefined
//             user.password = undefined
//             usermain.msg = undefined
//             // const condata = [...msgs, ...msgr].so
//             res.json({
//                 msg:msgr,
//                 user:usermain
//             })
//             // console.log(msgr)
//         } else {

//             // res.json(grp)
//         }

//         // res.json(user)

//     } catch (error) {
//         console.log("err6",error)
//     }
// })
// route.get('/getuser/:id', auth, async (req, res) => {
//     try {
//         // console.log(req.params.id)
//         const user = await User.findById(req.params?.id)
//         res.json(user)
        

//     } catch (error) {
//         console.log("err6",error)
//     }
// })
// route.get('/getalluser', async (req, res) => {
//     try {
//         const user = await User.find()
//         const grp = await Group.find()
//         // res.json([user,grp])
//         res.json(user.concat(grp))
//     } catch (error) {
//         console.log("err7",error)
//     }
// })
module.exports = route