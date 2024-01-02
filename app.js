const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);

sequelize
    .sync()
    .then(() =>
        app.listen(4000, () => {
            console.log("Server Running...");
        })
    )
    .catch(() => console.log("Server Can't run for some reason..."));
