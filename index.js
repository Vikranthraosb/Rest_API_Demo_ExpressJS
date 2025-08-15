require('dotenv').config()


const users = require("./MOCK_DATA.json")
const express = require('express')
const app = express();



// Creating the API
app.get('/users', (req,res)=>{
   return  res.json(users);
})


app.get('/users', (req,res)=>{
   return  res.json(users);
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is listning on ${process.env.PORT}`)
})
