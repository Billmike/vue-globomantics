import express from 'express'
import transactionRoute from './routes/transaction'
import userRoute from './routes/user'

const router = express.Router()

router.use(userRoute)
router.use(transactionRoute)

export default router
