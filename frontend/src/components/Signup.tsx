import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JobDataService from '../services/job';

export default function Signup() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    function handleSignupUser(data: object) {
        try {
            JobDataService.signupUser(data).then(response => console.log(response));
        } catch (e) {
            console.error(`Can't sign up user ${e}`);
        }
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            handleSignupUser({ ...inputValue });
            // const { success, message } = data;
            // if (success) {
            //     handleSuccess(message);
            //     setTimeout(() => {
            //         navigate("/");
            //     }, 1000);
            // } else {
            //     handleError(message);
            // }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" />
            </Form.Group>

            <Form.Select aria-label="Pick your role">
                <option>Pick your Role</option>
                <option value="1">Job Seeker</option>
                <option value="2">Job Creator</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}