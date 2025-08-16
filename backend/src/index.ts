import express from "express"
import cors from "cors"
import { rootRouter } from "./routes/index.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use("/api/v1", rootRouter);

app.listen(PORT);