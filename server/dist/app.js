"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3000;
require('dotenv').config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", require('./routes/index'));
app.use("/auth", require('./routes/auth'));
if (process.env.MONGO_DATABASE) {
    mongoose_1.default.connect(process.env.MONGO_DATABASE)
        .then(() => {
        console.log("Connected to MongoDB");
    })
        .catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
    });
}
else {
    console.log("Error Connecting to MongoDb, connection string is not present");
}
app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`);
});
