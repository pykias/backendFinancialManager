import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Icon from "@mdi/react";
import { mdiBank, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        await handlerMap.handleLogin(loginFormData);
        setLoginFormData({ email: '', password: '' });
    };

    return (
        <Navbar expand="lg" style={componentStyle()} className="shadow-sm">
            <Container>
                <Navbar.Brand>
                    <Button style={brandStyle()} onClick={() => navigate("/")} className="shadow-lg">
                        <Icon path={mdiBank} size={1.2} color={"white"} />
                        Finanční Aplikace
                    </Button>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={() => navigate("/")}>Transakce</Nav.Link>
                    <Nav.Link onClick={() => navigate("/financialOverview")}>Finanční Přehled</Nav.Link>
                    <Nav.Link onClick={() => navigate("/users")}>Uživatelé</Nav.Link>
                    <NavDropdown
                        title={loggedInUser ? loggedInUser.name : "Login"}
                        drop={"start"}
                        style={dropdownStyle()}
                    >
                        {loggedInUser ? (
                            <>
                                <NavDropdown.Item onClick={() => handlerMap.handleLogout()}>
                                    <Icon path={mdiLogout} size={0.8} color={"red"} /> Odhlásit se
                                </NavDropdown.Item>
                            </>
                        ) : (
                            <Form onSubmit={handleLoginSubmit} style={{ padding: '10px' }}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={loginFormData.email}
                                        onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" style={{ marginTop: '10px' }}>
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={loginFormData.password}
                                        onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                                    Přihlásit se
                                </Button>
                            </Form>
                        )}
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

function componentStyle() {
    return {
        backgroundColor: "linear-gradient(90deg, #007bff, #5a67d8)",
        padding: "8px",
        borderRadius: "8px",
    };
}

function brandStyle() {
    return {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "white",
        fontWeight: "bold",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#343a40",
    };
}

function dropdownStyle() {
    return {
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    };
}

export default NavBar;
