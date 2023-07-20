import app from "./server";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 8000;


mongoose.connect(process.env.JOBS_DB_URI)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })