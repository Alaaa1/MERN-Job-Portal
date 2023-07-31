import express, { Router } from "express";
import getjobsEndpoint from "../Jobs/useCases/getjobs";

const router: Router = express.Router();

router.route("/").get(getjobsEndpoint.execute);

export default router;