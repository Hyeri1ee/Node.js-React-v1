const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser");
const config = require('./config/key');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoDBURI, {
    //useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요~')
})

app.post('/register',async (req,res)=>{
    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    try{
        const user = await new User(req.body);
        res.status(200).json({success:true})
        user.save((err,userinfo)=> {
            if (err) return res.json({success:false,err}) 
            return res.status(200).json({
                success:true
            })       
        })
    }
    catch(err){
        res.status(500).json({success:false,err})
    }
})

app.post("/login",(req,res)=>{
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }   

        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password,(err,isMatch)=>{
            
        })
    })
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인   

    //비밃번호까지 맞다면 토큰을 생성하기.
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})