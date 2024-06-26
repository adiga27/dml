const express = require("express")
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/router");

const app = express();
app.use(express.json());

app.use("/api/v1",router);

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected"))
    .catch((e) => console.error(e));

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
})