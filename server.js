import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//databse config
connectDB();

//esmodule fix

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest objects to create api

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);

//rest api

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port most common for node
const PORT = process.env.PORT || 8080;

//App run / listen

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode ${PORT}`.bgCyan.white
  );
});
