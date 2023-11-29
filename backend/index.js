import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/repRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/rap", router);
mongoose
  .connect("mongodb+srv://aleksandre:movidadro021@cluster0.xvb47fa.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("successfully connected");
    app.listen(4001, () => console.log("App is listening on 4001 port"));
  })
  .catch((e) => {
    console.log(e);
  });
