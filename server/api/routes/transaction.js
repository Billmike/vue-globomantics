import express from 'express'
import mongoose from 'mongoose'
import Transactions from '../../models/transactions'

const router = express.Router()

router.get('/transaction/:year/:month', (request, response) => {
  const userId = request.get('userId')
  const month = request.params.month - 1
  const year = request.params.year
  const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0))
  const endDate = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

  const query = {
    userId,
    transactionDate: {
      $gte: startDate,
      $lt: endDate
    }
  }

  Transactions.find(query).sort({ 'transactionDate': 1 })
    .exec()
    .then(docs => response.status(200).json(docs))
    .catch(error => response.status(500).json(error))
})

router.get('/transaction/balance/:year/:month', (request, response) => {
  const userId = request.get('userId')
  const month = request.params.month - 1
  const year = request.params.year
  const endDate = new Date(Date.UTC(year, month, 1))
  const pipeline = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId)
      }
    },
    {
      $match: {
        transactionDate: { $lt: endDate }
      }
    },
    {
      $group: {
        _id: null,
        charges: { $sum: '$charge' },
        deposits: { $sum: '$deposit' }
      }
    }
  ]
  Transactions.aggregate(pipeline).exec().then(docs => response.status(200).json(docs))
    .catch(error => response.status(500).json(error))
})

router.post('/transaction', (request, response) => {
  let transaction = new Transactions(request.body)
  transaction.save((error, transaction) => {
    if (error) return console.log(error)
    response.status(201).json(transaction)
  })
})

export default router
