import React, { useState, useEffect } from "react";
import JobDataService from "../services/job";
import Button from 'react-bootstrap/Button';
import Job from "./Job";
import Form from 'react-bootstrap/Form';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

type JobsType = {
    _id: string;
    name: string;
    company: string;
    category: string;
    datePosted: Date;
}

export default function Jobs() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => JobDataService.getAll().then((res) => {
            setJobs(res.data.response.jobs);
            return res;
        }).then(res => res)
    });
    const [jobs, setJobs] = useState<JobsType[]>([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [category, setCategory] = useState<string>();

    function handleChange(event: any) {
        setSearchKeyWord(event.target.value);
    }

    function handleSearch(event: any) {
        event.preventDefault();
        try {
            JobDataService.find(searchKeyWord).then(response => {
                console.log(response);
                setJobs(response.data.response.jobs);
            });
        } catch (e) {
            console.error(`Unable to search ${e}`);
        }
    }

    // function retrieveJobs() {
    //     JobDataService.getAll().then(response => {
    //         console.log(response);
    //         setJobs(response.data.response.jobs);
    //     }).catch(e => {
    //         console.error(`Error while retrieving list of jobs ${e}`)
    //     });
    // }

    function handleFilterByCategory(e: any) {
        setCategory(e.target.value);
    }

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (isError) {
        return <span>Error while retrieving data</span>
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
                    <Job key={job._id} id={job._id} name={job.name} company={job.company} category={job.category} datePosted={job.datePosted} />)) :
                (jobs?.map(job => <Job key={job._id} id={job._id} name={job.name} company={job.company} category={job.category} datePosted={job.datePosted} />))}
        </div>
    )
}