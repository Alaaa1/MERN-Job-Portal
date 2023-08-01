import express from "express"
import cors from "cors"
import router from "./shared/jobs.routes";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/jobs", router);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;