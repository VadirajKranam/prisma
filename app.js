const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoute')
const postRouter=require('./routes/postRoute')
require('dotenv').config()
const app = express()
//here we go again
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//thoda secret hei
app.use(cookieParser())
app.use("/api", userRouter);
app.use("/api", postRouter);
app.get('/', (req, res) => {
res.send("<h1>Hello</h1>")
})
app.listen(3000, () => {
console.log('Listening to port 3000')
})