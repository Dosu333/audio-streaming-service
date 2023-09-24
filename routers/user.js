const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router();


router.post('/', authController.createUser) // Create user
router.get('/', authController.listUsers) // List all users
router.get('/:id', authController.userDetail) // Retrieve a user
router.patch('/:id', authController.userUpdate) // Update a user
router.delete('/:id', authController.deleteUser) // Delete a user
router.patch('/change-password/:id', authController.userChangePassword) // Change a user password

module.exports = router