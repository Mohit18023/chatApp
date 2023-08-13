const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./data/data.js');
const connectDB = require('./config/db.js');
const colors = require('colors')
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');


dotenv.config();
connectDB();
const app = express();
app.use(express.json());   // to accept JSON data
app.get("/",(req,res)=>{
    res.send("hello");
});

app.use('/api/user',userRoutes);

app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server running on port ${port}`.yellow.bold);
});