const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 9201;

const todo = require("./src/routes/todo");

app.use(express.json());
app.use(cors());

//sequelize or database
const db = require("./models");

//routes
app.use("/api/v1", todo);
app.use("/", (req, res) => {
  res.send("Deploy by Sukma Aspriliyawan");
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
