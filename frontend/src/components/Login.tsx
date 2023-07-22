import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import JobDataService from '../services/job';
import { UserContext } from './UsersContext';

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e: any) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }

    async function handleUserLogin({ email, password }: { email: string, password: string }) {
        try {
            return await JobDataService.loginUser({ email, password });
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            const loginResponse: any = await handleUserLogin({ email, password });
            console.log(loginResponse);
            if (loginResponse.data.status) {
                console.log("login response success", loginResponse.data);
                setUser(loginResponse.data.user);
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}