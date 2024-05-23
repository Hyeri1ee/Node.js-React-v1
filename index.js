const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser");
const config = require('./config/key');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cluster0:abcd1234@boiler.td8jjwt.mongodb.net/?retryWrites=true&w=majority&appName=boiler', {
    //useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~안영하세요~')
})

app.post('/register',async (req,res)=>{
    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    try{
        const user = await new User(req.body);
        res.status(200).json({success:true})
    }
    catch(err){
        res.status(500).json({success:false,err})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})