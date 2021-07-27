const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9201;
const router = require("./src/router/index");

app.use(express.json());
app.use(cors());

const todo = require("./models");

app.use("/api/v1", router);
app.use("/", (req, res) => {
    res.send("deploy by Sukma Aspriliyawan");
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
