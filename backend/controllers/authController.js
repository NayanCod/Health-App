const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture: image } = payload;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ googleId, email, name, image });
            await user.save();
        }

        const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "Google login successful", token: jwtToken });
    } catch (error) {
        res.status(401).json({ message: "Google login failed", error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Exclude password field if it exists

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "user data fetched successfully", user: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    googleLogin,
    getUserProfile,
};