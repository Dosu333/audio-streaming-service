const { User } = require('../models/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login controller
const userLogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password invalid'
            })
        }
        const user = await User.findOne({ where: { email: req.body.email } });
        const tokenClaims = { id: user.id, email: user.email, fullname: user.fullName}
        const accessSecret = process.env.ACCESS_JWT_SECRET;
        const refreshSecret = process.env.REFRESH_JWT_SECRET;

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const accessToken = jwt.sign(tokenClaims,accessSecret,{expiresIn: '1h'})
            const refreshToken = jwt.sign(tokenClaims,refreshSecret,{expiresIn: '100d'})

            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            })
        }
    } catch(error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}


// Get new access token through refresh token
const getNewAccessToken = async (req, res) => {
    try {
        const accessSecret = process.env.ACCESS_JWT_SECRET;
        const refreshSecret = process.env.REFRESH_JWT_SECRET

        // Verify refresh token
        const user = jwt.verify(req.body.refreshToken, refreshSecret)

        // Create new access token
        const tokenClaims = { id: user.id, email: user.email, fullname: user.fullName}
        const accessToken = jwt.sign(tokenClaims, accessSecret,{expiresIn: '1h'})

        return res.status(200).json({
            success: true,
            accessToken: accessToken
        })

    } catch(error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
}

module.exports = {
    userLogin,
    getNewAccessToken
}