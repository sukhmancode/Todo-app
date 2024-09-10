import express,{Request,Response} from 'express'
import todoRouter from '../routes/todo'
import userRouter from '../routes/sign'
const router = express.Router()

router.use("/todo",todoRouter)
router.use("/user",userRouter)
export default router;
