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
const Todo_1 = __importDefault(require("../models/Todo"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const zod_1 = require("zod");
const router = express_1.default.Router();
const todoSchema = zod_1.z.object({
    todo: zod_1.z.string(),
    isDone: zod_1.z.boolean(),
});
router.post('/createTodo', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = req.user;
    if (!user || !user.userId) {
        return res.status(401).json({ msg: 'User not authenticated' });
    }
    const parsedTodo = todoSchema.safeParse(req.body);
    if (!parsedTodo.success) {
        return res.status(411).json({ msg: 'Incorrect inputs' });
    }
    const { todo } = parsedTodo.data;
    yield Todo_1.default.create({
        todo,
        isDone: false,
        user: user.userId
    });
    return res.json({ msg: 'Todo created' });
}));
router.get('/allTodos', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user || !user.userId) {
        return res.status(401).json({ msg: 'User not authenticated' });
    }
    const todos = yield Todo_1.default.find({ user: user.userId });
    res.json({ todos });
}));
exports.default = router;
