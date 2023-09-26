const User = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// List all users controller
const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['passwordHash'] }
        });
        return res.status(200).json(users)
    } catch(error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
    
}

// Create user controller
const createUser =  async (req, res) => {
    try {
        // Input validation
        if (!req.body.email || !req.body.fullname || !req.body.password) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields. Check that your email, name and password are inputted correctly'
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        // Create the user
        const createdUser = await User.create({
            email: req.body.email,
            fullName: req.body.fullname,
            passwordHash: passwordHash
        });

        // Exclude the passwordHash before sending the response
        const userResponse = {
            id: createdUser.id,
            email: createdUser.email,
            fullName: createdUser.fullName,
        };

        return res.status(201).json(userResponse);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

// Retrieve user controller
const userDetail = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['passwordHash'] } })
        
        return res.status(200).json(user);
    } catch(error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
    
}

//Update user controller
const userUpdate = async (req, res) => {
    try {
        // Find user
        const user = await User.findByPk(req.user.id)
    
        // Update user
        if (req.body.fullname) {
            user.fullName = req.body.fullname
        } else {
            return res.status(400).json({
                success: false,
                error: "Name is missing. This is the only field that can be edited"
            })
        }
        user.save()

        // Exclude the passwordHash before sending the response
        const userResponse = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
        };

        return res.status(200).json(userResponse)
        
    } catch(error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}


// Delete user controller
const deleteUser = async (req, res) => {
    try {
        // Find user
        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }

        // Delete user
        await user.destroy()
        return res.status(200).json({
            success: true,
            message: 'User successfully deleted'
        })
    } catch(error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}


// Change user password controller
const userChangePassword = async (req, res) => {
    try {
        // Find user
        const user = await User.findByPk(req.user.id)
       
        // Check if the required fields were passed
        if (req.body.newpassword && req.body.oldpassword) {

            // Compare old password to saved password
            bcrypt.compare(req.body.oldpassword, user.passwordHash, async (err, result) => {

                if (result) {

                    // Hash and save new password
                    const newPasswordHash = await bcrypt.hash(req.body.newpassword, 10);
                    user.passwordHash = newPasswordHash
                    user.save()

                    return res.status(200).json({
                        success: true,
                        message: 'Password changed successfully'
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        error: 'Incorrect password'
                    })
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                error: "Passwords not found. Make sure the field are filled correctly"
            })
        }
        
    } catch(error) {
        console.error('Error changing password:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    listUsers,
    createUser,
    userDetail,
    userUpdate,
    deleteUser,
    userChangePassword,
}