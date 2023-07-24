import express, { Router } from "express";
import JobsController from "./jobs.controller";
import UsersController from "./users.controller";
import UserAuthentication from "../../middlewares/AuthMiddleware";

const router: Router = express.Router();

router.route("/").get(JobsController.apiGetJobs)//todo rest best practices, separate routes
    .post(JobsController.apiPostJob)
    .put(JobsController.apiEditJob)
    .delete(JobsController.apiDeleteJob);

router.route("/authenticate").post(UserAuthentication.userVerification)

router.route("/login").post(UsersController.apiLoginUser);
router.route("/signup").post(UsersController.apiSignupUser);
export default router;