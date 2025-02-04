require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectToDB = require("./db/conn");
connectToDB();
app.use(express.json());
app.use(cookieParser());
const userRouter = require("./routes/userRoutes");
app.use("/api/v1", userRouter);
app.use("/", (req, res, next) =>
  res.json({ success: true, message: "deployed aya" })
);
const PORT = process.env.PORT || 5000;

app.listen(PORT);
