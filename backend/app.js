require("dotenv").config();
const path = require("path");
require("express-async-errors");
const express = require("express");
const AsyncHandler = require("express-async-handler");
const connectDB = require("./db/connectDB");
const ErrorHandler = require("./errors/asyn-error-handler");
const app = express();
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/api/v1/user/auth", userRoutes);
app.use("/api/v1/goals", goalRoutes);

// server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
}

// errors
app.use(ErrorHandler);

const start = AsyncHandler(async () => {
  await connectDB(process.env.MONGODB_CONNECT);
  console.log("connected to database");
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});

start();
