import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import api from './api'

const app = express()

mongoose.connect('mongodb://localhost:27017/globomantics')

const db = mongoose.connection

app.set('port', (process.env.PORT || 8081))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', api)
app.use(express.static('static'))
app.use(morgan('dev'))

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')

  app.listen(app.get('port'), () => {
    console.log(`API Server listening on port: ${app.get('port')}`)
  })
})

app.use((request, response, next) => {
  const error = new Error('Not found')
  error.status = 404
  response.json(error)
})

export default app
