require('dotenv').config();

const express = require('express');
const app = express();

const notFound = require("./middlewares/not-found");
const errorHandler = require('./middlewares/error-handler')

//middlewares 
app.use(express.json())


//routes 

app.get('/', (req,res)=>{
    res.send('Hello this is store api')
})

app.use(notFound)
app.use(errorHandler)

port = process.env.PORT || 3000

const start = async () =>{
    try {
        // connect to db 
        app.listen(port, console.log(`Server connected to port ${port}..`))
    } catch (error) {
        
    }
}


start()