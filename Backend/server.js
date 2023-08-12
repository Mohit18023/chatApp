const express = require('express');
const { chats } = require('./data/data.js')
const app = express();

app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/api/chat/:id",(req,res)=>{
    res.send(chats)
    console.log(chats)
})

app.listen(3000,()=>{
    console.log('server running on port 3000');
});