import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JobDataService from '../services/job';
import { UserContext } from '../contexts/UsersContext';

export default function Signup() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    function handleNameChange(e: any) {
        setUsername(e.target.value)
    }
    function handleEmailChange(e: any) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }
    function handleRoleChange(e: any) {
        setRole(e.target.value)
    }

    async function handleSignupUser(data: object) {
        try {
            return await JobDataService.signupUser(data);
        } catch (e) {
            console.error(`Can't sign up user ${e}`);
        }
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const signupResponse: any = await handleSignupUser({ username, email, password, role });
            if (signupResponse.data.result) {
                setUser(signupResponse.data.result.username);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" value={username} onChange={handleNameChange} />
            </Form.Group>

            <Form.Select aria-label="Pick your role" onChange={handleRoleChange} value={role}>
                <option>Pick your Role</option>
                <option value="seeker">Job Seeker</option>
                <option value="creator">Job Creator</option>
            </Form.Select>

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