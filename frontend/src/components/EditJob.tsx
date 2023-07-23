import { FormEvent, useContext, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import JobDataService from "../services/job";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UsersContext";

type Location = {
    id: string;
    name: string;
    company: string;
    category: string;
}

export default function EditJob() {
    const { user, setUser } = useContext(UserContext);
    const location: Location = useLocation().state;
    const navigate = useNavigate();
    const [job, setJob] = useState(location.name);
    const [company, setCompany] = useState(location.company);
    const [category, setCategory] = useState(location.category);

    function handleNameChange(event: any): void {
        setJob(event.target.value);
    }
    function handleCompanyChange(event: any): void {
        setCompany(event.target.value);
    }
    function handleCategoryChange(event: any): void {
        setCategory(event.target.value);
    }

    function saveJob(e: FormEvent): void {
        e.preventDefault();
        let data = {
            _id: location.id,
            name: job,
            company,
            category,
            user_id: user._id
        }
        try {
            JobDataService.editJob(data).then(() => navigate("/"));
        } catch (e) {
            console.error(`Unable to edit job ${e}`);
        }
    }

    return (
        <Form onSubmit={saveJob}>
            <Form.Group className="mb-3" controlId="jobName">
                <Form.Label>Job Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Job Name" onChange={handleNameChange} value={job} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" onChange={handleCompanyChange} value={company} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name" onChange={handleCategoryChange} value={category} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}