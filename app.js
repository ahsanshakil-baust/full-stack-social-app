const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

sequelize
  .sync()
  .then(() =>
    app.listen(4000, () => {
      console.log("Server Running...");
    })
  )
  .catch((err) => console.log(err.message));
