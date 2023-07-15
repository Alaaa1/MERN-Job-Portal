import React, { useState, useEffect } from "react";
import JobDataService from "../services/job";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Job from "./Job";

export default function Jobs() {
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        retrieveJobs();
    }, []);

    function retrieveJobs() {
        JobDataService.getAll().then(response => {
            console.log(response.data);
            setJobs(response.data.jobs);
        }).catch(e => {
            console.error(`Error while retrieving list of jobs ${e}`)
        });
    }

    return (
        <div>
            {jobs.map(job =>
                <Job key={job._id} id={job._id} name={job.name} company={job.company} category={job.category} datePosted={job.datePosted} />)}
        </div>
    )
}