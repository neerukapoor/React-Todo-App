import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
const PORT = 3000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/", require('./routes/index'));
app.use("/auth", require('./routes/auth'));

if(process.env.MONGO_DATABASE)
{
    mongoose.connect(process.env.MONGO_DATABASE)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
    });
}
else {
    console.log("Error Connecting to MongoDb, connection string is not present")
}

app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})