const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
require('dotenv').config();

app.use(express.json());

app.use("/", require('./routes/index'));
app.use("/auth", require('./routes/auth'));

mongoose.connect(process.env.MONGO_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.log("Error connecting to MongoDB");
});

app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})