const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9201;
const router = require("./src/router/todo");

app.use(express.json());
app.use(cors());

const db = require("./models");

//routes
app.use("/api/v1", router);
app.use("/", (req, res) => {
  res.send("Deploy by Sukma Aspriliyawan");
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
