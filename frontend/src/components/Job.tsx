import React, { useState, useEffect } from "react";
import JobDataService from "../services/job";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

interface JobData {
    id: any;
    name: string;
    company: string;
    category: string;
    datePosted: Date;
}

export default function Job(props: JobData) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.name} requested by {props.company} in category {props.category}
                    </Card.Text>
                    <Link to={"/editJob/" + props.id} state={props}><Button variant="primary">Edit</Button></Link>
                </Card.Body>
            </Card>
        </div>
    )
}