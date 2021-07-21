require('dotenv').config()
const express = require('express')
const app = express()
const ejs= require('ejs')
const path=require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session= require('express-session')
const flash= require('express-flash')
const DB='mongodb+srv://Abhinav:msdhoni07@pizza.oju8a.mongodb.net/Pizza?retryWrites=true&w=majority'
const MongoDbStore = require('connect-mongo')
const passport = require ('passport')
const Emitter = require('events')

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(()=>{
console.log('Connection Successful')
}).catch((err)=>console.log('No connection'))

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb+srv://Abhinav:msdhoni07@pizza.oju8a.mongodb.net/Pizza?retryWrites=true&w=majority'
    }),
    saveUninitialized:false,
    cookie:{maxAge: 1000*60*60*24} //24hrs
}))

//Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Global middleware to set session in front end && user
app.use((req,res,next)=>{
   res.locals.session = req.session
   res.locals.user = req.user
   next()
})
//set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)


const server= app.listen(PORT ,()=>{
    console.log('Listening on port '+ PORT)
})

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})



//npm run dev--->Nodemon
//npm run watch-->laravel mix