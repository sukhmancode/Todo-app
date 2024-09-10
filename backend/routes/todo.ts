import express, { Request, Response } from 'express';
import Todo from '../models/Todo';
import authMiddleware from '../middleware/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const todoSchema = z.object({
    todo: z.string(),
    isDone: z.boolean(),
});

router.post('/createTodo', authMiddleware, async (req: Request, res: Response) => {
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
    await Todo.create({
        todo,
        isDone: false,
        user: user.userId
    });

    return res.json({ msg: 'Todo created' });
});

router.get('/allTodos', authMiddleware, async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
        return res.status(401).json({ msg: 'User not authenticated' });
    }

    const todos = await Todo.find({ user: user.userId });
    res.json({ todos });
});

export default router;
