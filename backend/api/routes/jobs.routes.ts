import express, { Router } from "express";
import JobsController from "./jobs.controller";
import UsersController from "./users.controller";
import userVerification from "../../middlewares/AuthMiddleware";

const router: Router = express.Router();

router.route("/").get(JobsController.apiGetJobs)
    .post(userVerification)
    .put(JobsController.apiEditJob)
    .delete(JobsController.apiDeleteJob)

router.route("/login").post(UsersController.apiLoginUser);
router.route("/signup").post(UsersController.apiSignupUser);
export default router;