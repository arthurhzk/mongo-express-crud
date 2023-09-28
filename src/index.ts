import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes";
const app = express();
const port = 8000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const mongoURL =
  "mongodb+srv://arthurkunz:RgQ4tsL9jgcdcdMY@mevn-cluster.oer4pvq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
