import express, { Router } from "express";
import getjobsEndpoint from "../Jobs/useCases/getjobs";
import createjobEndpoint from "../Jobs/useCases/createJob";
import deleteJobEndpoint from "../Jobs/useCases/deleteJob";

const router: Router = express.Router();

router.route("/").get((res, req) => getjobsEndpoint.execute(res, req))
    .post((req, res) => createjobEndpoint.execute(req, res))
    .delete((req, res) => deleteJobEndpoint.execute(req, res));

export default router;