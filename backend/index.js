const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
// const moodRoute = require("./routes/moodRoute");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoute);
// app.use("/api/mood", moodRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
