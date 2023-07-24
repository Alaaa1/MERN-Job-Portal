import JobDataService from "../services/job";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UsersContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { JobPropsType } from "../types/types.users";



export default function Job(props: JobPropsType) {
    const { user } = useContext(UserContext);

    const notify = (message: string) => toast(message);

    function handleDelete() {
        try {
            console.log(props.job, user)
            JobDataService.deleteJob(props.job._id, user._id).then((res) => {
                if (res.data.status) {
                    props.handleChangingJobs(props.job._id)
                    notify("Job Deleted successfully!")
                }//todo use other http stats codes
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
                    <Card.Title>{props.job.name}</Card.Title>
                    <Card.Text>
                        {props.job.name} requested by {props.job.company} in category {props.job.category} on {props.job.datePosted.toString()}
                    </Card.Text>
                    <Link to={"/editJob/" + props.job._id} state={props.job}><Button variant="primary">Edit</Button></Link>
                    {(props.job.user_id === user._id) && <Button variant="secondary" onClick={handleDelete}>Delete</Button>}
                    <ToastContainer />
                </Card.Body>
            </Card>
        </Col>
    )
}