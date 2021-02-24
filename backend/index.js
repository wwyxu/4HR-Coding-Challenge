const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes
const users = require("./routes/users");

// Connect To Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://William:Nob2231to@cluster0.lqe4g.mongodb.net/test?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Use Routes
app.use("/users", users);

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
