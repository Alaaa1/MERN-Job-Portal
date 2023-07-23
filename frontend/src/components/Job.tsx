import JobDataService from "../services/job";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UsersContext";
import { useContext } from "react";

type JobData = {
    id: string;
    name: string;
    company: string;
    category: string;
    datePosted: Date;
}

export default function Job(props: JobData) {
    const { user, setUser } = useContext(UserContext);
    function handleDelete() {
        try {
            JobDataService.deleteJob(props.id, user._id).then(() => window.location.reload());
        } catch (e) {
            console.error(`Unable to issue the delete command ${e}`);
        }
    }
    return (
        <Col md="4">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.name} requested by {props.company} in category {props.category} on {props.datePosted.toString()}
                    </Card.Text>
                    <Link to={"/editJob/" + props.id} state={props}><Button variant="primary">Edit</Button></Link>
                    <Button variant="secondary" onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}