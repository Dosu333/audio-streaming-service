const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const IsAuthenticated = require('../middleware/isAuthenticated')
const express = require('express')
const router = express.Router();


router.post('/', userController.createUser) // Create user
router.get('/', userController.listUsers) // List all users
router.get('/detail', IsAuthenticated, userController.userDetail) // Retrieve a user
router.patch('/update', IsAuthenticated, userController.userUpdate) // Update a user
router.delete('/:id', userController.deleteUser) // Delete a user
router.patch('/change-password', IsAuthenticated, userController.userChangePassword) // Change a user password
router.post('/login', authController.userLogin) // User Login
router.post('/refresh', authController.getNewAccessToken) // Refresh access token

module.exports = router