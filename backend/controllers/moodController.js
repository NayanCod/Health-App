const Mood = require("../models/Mood");
const User = require("../models/User");


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

const getUserMoodsAnalytics = async (req, res) => {
    const userId = req.user.id;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    try {
        const moods = await Mood.find({ user: userId });

        // Filter moods for the current month and year
        const currentMonthMoods = moods.filter(mood => {
            const moodDate = new Date(mood.timestamp);
            return moodDate.getMonth() === currentMonth && moodDate.getFullYear() === currentYear;
        });

        // Get unique days with mood entries
        const uniqueDays = new Set(currentMonthMoods.map(mood => new Date(mood.timestamp).toDateString()));

        // Calculate the frequency of each mood
        const moodFrequency = currentMonthMoods.reduce((acc, mood) => {
            acc[mood.mood] = (acc[mood.mood] || 0) + 1;
            return acc;
        }, {});

        // Determine the most frequent mood
        const mostFrequentMood = Object.keys(moodFrequency).reduce((a, b) => moodFrequency[a] > moodFrequency[b] ? a : b);

        res.status(200).json({
            message: "Mood analytics fetched successfully",
            analytics: {
                currentMonthCheckins: uniqueDays.size,
                mostFrequentMood: mostFrequentMood,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getUserMoods,
    createUserMood,
    getUserMoodsAnalytics,
};