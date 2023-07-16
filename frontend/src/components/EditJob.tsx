import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import JobDataService from "../services/job";
import { useLocation } from "react-router-dom";

export default function EditJob() {
    const location = useLocation().state;
    const [job, setJob] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");

    function handleNameChange(event: any): void {
        setJob(event.target.value);
    }
    function handleCompanyChange(event: any): void {
        setCompany(event.target.value);
    }
    function handleCategoryChange(event: any): void {
        setCategory(event.target.value);
    }

    function saveJob(): void {
        let data = {
            _id: location.id,
            name: job,
            company,
            category
        }
        try {
            JobDataService.editJob(data).then(response => {
                console.log(response.data);
            })
        } catch (e) {
            console.log(`Unable to post a new job ${e}`);
        }
    }

    return (
        <Form onSubmit={saveJob}>
            <Form.Group className="mb-3" controlId="jobName">
                <Form.Label>Job Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Job Name" onChange={handleNameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" onChange={handleCompanyChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name" onChange={handleCategoryChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}