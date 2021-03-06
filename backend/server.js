const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

const panelsRouter = require("./routes/panels");
const tasksRouter = require("./routes/tasks");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/panels", panelsRouter);
app.use("/tasks", tasksRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
