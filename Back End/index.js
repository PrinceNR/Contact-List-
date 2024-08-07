import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {connectDB } from './config/dbConnection.js'
import router from './Router/contactRouter.js';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 300; 
   
app.use("/contact/" , router)

connectDB().then( () =>
    app.listen(PORT ,() => {
        console.log(`Server is running on port ${PORT}`); 
    }
    )
) 








         