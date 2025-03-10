const Mood = require("../models/Mood");


const getUserMoods = async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id }).sort({ timestamp: -1 });
        res.status(200).json({message: "user moods fetched successfully", moods: moods});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createUserMood = async (req, res) => {
    const { mood, description } = req.body;

    try {
        const newMood = new Mood({
            user: req.user.id,
            mood,
            description,
        });

        const savedMood = await newMood.save();
        res.status(201).json({ message: "Mood created successfully", mood: savedMood });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getUserMoods,
    createUserMood,
};