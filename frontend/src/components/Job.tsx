import JobDataService from "../services/job";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UsersContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { JobData } from "../types/types.users";



export default function Job(props: JobData) {
    const { user } = useContext(UserContext);

    const notify = (message: string) => toast(message);

    function handleDelete() {
        try {
            JobDataService.deleteJob(props.id, user._id).then((res) => {
                if (res.data.status) {
                    props.handleChangingJobs(props.id)
                    notify("Job Deleted successfully!")
                }
                else {
                    notify("Sorry This user can't delete this job");
                }
            });
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
                    <ToastContainer />
                </Card.Body>
            </Card>
        </Col>
    )
}