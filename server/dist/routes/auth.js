"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../db/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || username.trim() === "")
            res.status(400).json({ message: "Username can not be empty" });
        if (!password || password.trim() === "")
            res.status(400).json({ message: "Password can not be empty" });
        const existingUser = yield auth_1.User.findOne({ username });
        if (existingUser) {
            res.status(500).json({ message: "User already present" });
        }
        const user = yield new auth_1.User({
            username,
            password
        });
        if (!process.env.JWT_SECRET)
            return res.status(500).json({ message: "Internal server error" });
        const jwtToken = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        yield user.save();
        res.status(200).json({ message: "Singup Successful", jwtToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while Signing Up" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || username.trim() === "")
            return res.status(400).json({ message: "Username can not be empty" });
        if (!password || password.trim() === "")
            return res.status(400).json({ message: "Password can not be empty" });
        const existingUser = yield auth_1.User.findOne({ username, password });
        if (!existingUser)
            return res.status(404).json({ error: "Either Username or password is not correct " });
        const user = yield new auth_1.User({
            username,
            password
        });
        if (!process.env.JWT_SECRET)
            return res.status(500).json({ message: "Internal server error" });
        const jwtToken = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login Successfully", jwtToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while Loging In: " + error });
    }
}));
exports.default = router;
