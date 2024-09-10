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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username,
            email,
            password: hashedPassword
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
        return res.status(201).json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while signing up" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const newUser = yield User_1.default.findOne({ email });
    if (!newUser) {
        return res.status(400).json({ message: "newUser not found!" });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, newUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = jsonwebtoken_1.default.sign({ newUserId: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
    return res.status(200).json({ token });
}));
exports.default = router;
