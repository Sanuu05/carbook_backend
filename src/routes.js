const express = require('express')
const route = express.Router()
const upload = require('./multer')
const cloudinary = require('./cloud')
const fs = require('fs')
const Cars = require('./models/cars')
const auth = require('./middleware/auth')
const User = require('./models/user')
const Order = require('./models/orders')
const axios = require('axios')
const { json } = require('body-parser')


route.get('/',(req,res)=>{
    res.json('hello from routes')
})

route.use('/upload',auth,upload.array('image'),async(req,res)=>{
    try {
        
    
    const uploader = async(path) =>await cloudinary.uploads(path,'Images');
    const {name,brand,price,fueltype,transmission,seats,doors,bags,address,city} = req.body
    const find = await User.findById(req.user)
    console.log('vvv',req.body)

    if(req.method==="POST"){
        if(name && brand && price && fueltype && transmission && seats && doors && find && bags && address && city){
        const urls = []
        const files = req.files;
        for (const file of files){
            const {path} = file;
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        
            const newdata = new Cars({...req.body,img:urls,by:find})
            const savedata = await newdata.save()
            res.json(savedata)

        // }
    

        // res.status(200).json({
        //     message:'image uploaded',
        //     data:urls
        // })


    }
    else{
        res.status(400).json('fill all fields')
        console.log('fill all fields')
    }

    }
    else{
        res.status(405).json({
            err:'method is not suppoerted'
        })
        onsole.log('not')
    }
} catch (error) {
    console.log('err',error)
        
}
})

route.get('/cars',async(req,res)=>{
    try {
        const cars = await Cars.find()
        const orders = await Order.find()
        if(cars){
            const carfil = await Promise.all(cars?.map(async(val,ind)=>{
                //   const order = orders?.map((v,i)=>{
                //     console.log('vvv',v)
                //   })
                const findorder = await Order.find({carid: val?._id})
                
                return {val,findorder}
                
               
            }))
            console.log('vvv',carfil)
            res.json(carfil)
            
        }
       
        
       
        
    } catch (error) {
        console.log(error)
        
    }
})
route.get('/search/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        const token = '0e54449e-849f-4bb2-a6e7-29fdaed99b10'
        const config = {
        
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                // withCredentials: false,
            }
        };

        const { data } = await axios.get(`https://atlas.mapmyindia.com/api/places/geocode?address=${req.params.id}&itemCount=100`,config)
        console.log('data',data)
        res.json(data)
    } catch (error) {
        console.log('err',error)
        
    }
})
route.get('/mycars',auth,async(req,res)=>{
    try {
        const cars = await Cars.find({by:req.user})
        res.json(cars)
    } catch (error) {
        
    }
})
route.delete('/car/:id',auth,async(req,res)=>{
    try {
        const cars = await Cars.findByIdAndDelete(req.params.id)
        res.json(cars)
    } catch (error) {
        
    }
})
route.get('/detail/:id',async(req,res)=>{
    try {
        const cars = await Cars.findById(req.params.id)

        const findorder = await Order.find({carid:req.params.id})
        res.json({data:cars,order:findorder})
    } catch (error) {
        
    }
})

route.post('/order',auth, async(req,res)=>{
    try {
        const {carid,from, to, hours,amount} = req.body
        
        const findcar = await Cars.findById(carid)
        const finduser = await User.findById(req.user)
        console.log('req',{findcar,finduser,data:req.body})
        if(findcar && from && to && hours && amount && finduser){
            const order = new Order({
                carid:findcar,
                from,
                to,
                hours,
                amount,
                by:finduser
            })
            const save = await order.save()
            console.log(save)
            res.json(save)
        }
    } catch (error) {
        console.log(error)
        
    }
})
route.get('/allorders',async(req,res)=>{
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (error) {
        
    }
})
route.get('/mybooking',auth,async(req,res)=>{
    console.log('cvc')
    try {
        const findorder = await Order.find({by:req.user}).populate("carid","name brand img price bags doors seats transmission")
        console.log(findorder)
        res.json(findorder)
    } catch (error) {
        
    }
})
route.get('/carorder',auth,async(req,res)=>{
    console.log('cvc')
    try {
        const findorder = await Order.find().populate("carid","name brand img price bags doors seats transmission by").populate("by","name email")
        const filter = findorder?.filter(p=>p?.carid?.by == req.user)
        // console.log("vbc", filter)
        res.json(filter)
    } catch (error) {
        
    }
})

module.exports = route