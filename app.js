require('dotenv').config();
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect')

const productsRoutes = require('./routes/products')

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require('./middlewares/error-handler');

//middlewares 
app.use(express.json())


//routes 
app.get('/', (req,res)=>{
    res.send('Hello this is store api')
})

//products route 
app.use("/api/v1/products",productsRoutes);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



port = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server connected to port ${port}..`))
    } catch (error) {
        console.log(error);
        
    }
}

start()