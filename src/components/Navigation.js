import React, { Component } from 'react'
import { Col, Navbar, Row, Form, Button, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Navigation extends Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to="/">Dashboard</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
