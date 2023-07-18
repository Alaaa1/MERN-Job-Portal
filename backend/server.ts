import express from "express"
import cors from "cors"
import jobs from "./api/routes/jobs.routes"

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/v1/jobs", jobs);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;