import mongoose from 'mongoose'

const { Schema } = mongoose

let transactionSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, required: true },
  description: { type: String, required: true },
  charge: Number,
  deposit: Number,
  notes: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
