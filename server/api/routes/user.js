import express from 'express'
import User from '../../models/users'

const router = express.Router()

router.get('/user/:id', (request, response) => {
  User.findById(request.params.id).exec().then(foundUser => {
    return response.status(200).json({
      message: `Found user with id of ${foundUser.id}`,
      foundUser
    })
  }).catch(error => {
    return response.status(500).json({
      message: error.message
    })
  })
})

router.get('/user/email/:email', (request, response) => {
  User.find({ 'email': request.params.email }).exec().then(foundUser => {
    return response.status(200).json({
      message: `Found user with email of ${foundUser.email}`,
      foundUser
    })
  }).catch(error => {
    return response.status(500).json({
      message: error.message
    })
  })
})

router.post('/user', (request, response) => {
  const newUser = new User(request.body)
  newUser.save((error, user) => {
    if (error) return console.log(error)
    return response.status(201).json({
      message: 'User created successfully',
      user
    })
  })
})

router.put('/user/:id', (request, response) => {
  let query = { _id: request.params.id }
  let doc = {
    isActive: request.body.isActive
  }
  User.update(query, doc, (error, rawResponse) => {
    if (error) return console.log(error)
    return response.status(200).json({
      message: 'Successfully updated user',
      rawResponse
    })
  })
})

export default router
