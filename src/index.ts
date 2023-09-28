import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
const router = express.Router();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
const PORT = process.env.PORT || 8000;
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Server is running on port 8000");
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

app.use("/api", router);
