import React, { useState, useEffect } from "react";
import JobDataService from "../services/job";
import Button from 'react-bootstrap/Button';
import Job from "./Job";
import Form from 'react-bootstrap/Form';

export default function Jobs() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [category, setCategory] = useState(null);

    useEffect(() => {
        retrieveJobs();
        console.log('i fire once');
    }, []);

    function handleChange(event: any) {
        setSearchKeyWord(event.target.value);
    }

    function handleSearch(event: any) {
        event.preventDefault();
        try {
            JobDataService.find(searchKeyWord).then(response => {
                console.log(response.data);
                setJobs(response.data.jobs);
            });
        } catch (e) {
            console.error(`Unable to search ${e}`);
        }
    }

    function retrieveJobs() {
        JobDataService.getAll().then(response => {
            console.log(response.data);
            setJobs(response.data.jobs);
        }).catch(e => {
            console.error(`Error while retrieving list of jobs ${e}`)
        });
    }

    function handleFilterByCategory(e: any) {
        setCategory(e.target.value);
    }

    return (
        <div>
            <Form.Select aria-label="Default select example" onChange={handleFilterByCategory}>
                <option value="">Filter by category</option>
                <option value="it">IT</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="accounting">Accounting</option>
                <option value="education">Education</option>
            </Form.Select>

            <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                    <Form.Label>Search by keyword</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                </Form.Group>
                <Button type="submit">Search</Button>
            </Form>

            {(category) ?
                (jobs.filter(job => job.category === category).map(job =>
                    <Job key={job._id} stateChanger={setJobs} id={job._id} name={job.name} company={job.company} category={job.category} datePosted={job.datePosted} />)) :
                (jobs.map(job => <Job key={job._id} stateChanger={setJobs} id={job._id} name={job.name} company={job.company} category={job.category} datePosted={job.datePosted} />))}
        </div>
    )
}