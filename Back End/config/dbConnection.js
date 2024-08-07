import mongoose from 'mongoose';

// const connectDB = async () => {


//     try {
//         const connect = await mongoose.connect(process.env.CONNCECTION_STRING)
//         console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);   
//     }
//     catch (error) {
//         console.error(`Error connecting to MongoDB: ${error.message}`);
//         process.exit(1);
//     }
// }


// module.exports = connectDB


const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`MongoDb connected : ${connect.connection.host}, ${connect.connection.name}`)
    }
    catch(error){
        console.error(`Error connecting to Mongodb  ${error.message}`)
    }
}

export{connectDB}