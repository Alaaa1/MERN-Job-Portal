import express from "express"
import JobsController from "./jobs.controller";
import UsersController from "./users.controller";

const router = express.Router();

router.route("/").get(JobsController.apiGetJobs)
    .post(JobsController.apiPostJob)
    .put(JobsController.apiEditJob)
    .delete(JobsController.apiDeleteJob)

router.route("/login").get(UsersController.apiGetUser)
export default router;