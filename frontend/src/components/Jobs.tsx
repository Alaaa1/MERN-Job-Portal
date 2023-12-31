import { useState } from "react";
import JobDataService from "../services/job";
import { Container, Button, Col, Form } from 'react-bootstrap';
import Job from "./Job";
import {
    useQuery,
} from '@tanstack/react-query'
import { JobsType } from "../types/types.users";

export default function Jobs() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => JobDataService.getAll().then((res) => {
            setJobs(res.data.jobs);
            return res;
        }).then(res => res)
    });
    const [jobs, setJobs] = useState<JobsType[]>([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [category, setCategory] = useState<string>();

    function handleChangingJobs(jobId: string): void {
        setJobs(jobs.filter(job => job._id !== jobId));
    }

    function handleChange(event: any) {
        setSearchKeyWord(event.target.value);
    }

    function handleSearch(event: any) {
        event.preventDefault();
        try {//todo use debounce
            JobDataService.find(searchKeyWord).then(response => {
                setJobs(response.data.jobs);
            });
        } catch (e) {
            console.error(`Unable to search ${e}`);
        }
    }

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
        <div className="Jobs">
            <Container className="p-4">
                <Col md="8">
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
                    <div style={{ display: "flex", gap: "3em" }}>
                        {(category) ?
                            (jobs.filter(job => job.category === category).map(job =>
                                <Job key={job._id} job={job} handleChangingJobs={handleChangingJobs} />)) :
                            (jobs?.map(job => <Job key={job._id} job={job} handleChangingJobs={handleChangingJobs} />))}
                    </div>
                </Col>
            </Container>
        </div>
    )
}