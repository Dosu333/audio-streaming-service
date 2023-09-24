const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router();


router.post('/', userController.createUser) // Create user
router.get('/', userController.listUsers) // List all users
router.get('/:id', userController.userDetail) // Retrieve a user
router.patch('/:id', userController.userUpdate) // Update a user
router.patch('/change-password/:id', userController.userChangePassword) // Change a user password

module.exports = router