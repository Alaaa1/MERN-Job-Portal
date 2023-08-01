import express, { Router } from "express";
import getjobsEndpoint from "../Jobs/useCases/getjobs";
import createjobEndpoint from "../Jobs/useCases/createJob";

const router: Router = express.Router();

router.route("/").get(getjobsEndpoint.execute)
    .post(createjobEndpoint.execute);

export default router;