import express from "express"
import cors from "cors"
import { rootRouter } from "./routes/index.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
}));
const PORT = process.env.PORT || 8080;

app.use("/api/v1", rootRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
    })
})