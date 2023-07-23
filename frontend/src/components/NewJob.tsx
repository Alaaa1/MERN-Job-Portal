import React, { useContext, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import JobDataService from "../services/job";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UsersContext";
import { saveJobType } from "../types/types.users";

export default function NewJob() {
    const { user, setUser } = useContext(UserContext);
    const [job, setJob] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    function handleNameChange(event: any) {
        setJob(event.target.value);
    }
    function handleCompanyChange(event: any) {
        setCompany(event.target.value);
    }
    function handleCategoryChange(event: any) {
        setCategory(event.target.value);
    }

    function saveJob(e: React.FormEvent): void {
        e.preventDefault();
        let data: saveJobType = {
            name: job,
            company,
            category,
            user_id: user._id
        }
        try {
            JobDataService.createJob(data).then(() => {
                navigate("/");
            })
        } catch (e) {
            console.error(`Unable to post a new job ${e}`);
        }
    }

    return (
        <Form onSubmit={saveJob}>
            <Form.Group className="mb-3">
                <Form.Label>Job Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Job Name" onChange={handleNameChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" onChange={handleCompanyChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name" onChange={handleCategoryChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}