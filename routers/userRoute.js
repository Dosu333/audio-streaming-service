const authController = require('../controllers/userControllers/authController')
const userController = require('../controllers/userControllers/userController')
const IsAuthenticated = require('../permissions/isAuthenticated')
const express = require('express')
const router = express.Router();


router.post('/', userController.createUser) // Create user
router.get('/', IsAuthenticated, userController.listUsers) // List all users
router.get('/:id', userController.userDetail) // Retrieve a user
router.patch('/:id', userController.userUpdate) // Update a user
router.delete('/:id', userController.deleteUser) // Delete a user
router.patch('/change-password/:id', userController.userChangePassword) // Change a user password
router.post('/login', authController.userLogin) // User Login
router.post('/refresh', authController.getNewAccessToken) // Refresh access token

module.exports = router