import express, { Router } from "express"
import JobsController from "./jobs.controller";
import UsersController from "./users.controller";

const router: Router = express.Router();

router.route("/").get(JobsController.apiGetJobs)
    .post(JobsController.apiPostJob)
    .put(JobsController.apiEditJob)
    .delete(JobsController.apiDeleteJob)

router.route("/login").get(UsersController.apiGetUser)
export default router;