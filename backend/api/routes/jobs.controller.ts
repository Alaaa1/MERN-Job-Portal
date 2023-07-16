import JobsDAO from "../../dao/jobs.dao";

interface Filters {
    name?: string;
    category?: string;
}


export default class JobsController {
    static async apiGetJobs(req, res, next) {
        let filters: Filters = {};
        console.log("Got called");
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.category) {
            filters.category = req.query.category;
        }
        const { jobsList, totalNumJobs } = await JobsDAO.getJobs({ filters });
        let response = {
            jobs: jobsList,
            total_results: totalNumJobs
        };
        res.json(response);
    }

    static async apiPostJob(req, res, next) {
        try {
            const newJob = {
                name: req.body.name,
                datePosted: new Date(),
                company: req.body.company,
                category: req.body.category
            }
            const jobResponse = await JobsDAO.addJob(newJob);
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiEditJob(req, res, next) {
        try {
            console.log(req.body);
            const jobId = req.body._id;
            const data = {
                name: req.body.name,
                company: req.body.company,
                category: req.body.category
            }
            const reposne = await JobsDAO.editJob(jobId, data);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}