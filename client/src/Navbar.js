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
                <Nav className="ml-auto">
                    <Nav.Link onClick={() => navigate("/")} style={navLinkStyle()}>Transakce</Nav.Link>
                    <Nav.Link onClick={() => navigate("/financialOverview")} style={navLinkStyle()}>Finanční Přehled</Nav.Link>
                    <Nav.Link onClick={() => navigate("/users")} style={navLinkStyle()}>Uživatelé</Nav.Link>
                    <NavDropdown
                        title={loggedInUser ? loggedInUser.name : "Login"}
                        drop={"start"}
                        style={dropdownStyle()}
                    >
                        {loggedInUser ? (
                            <NavDropdown.Item onClick={() => handlerMap.handleLogout()} style={dropdownItemStyle()}>
                                <Icon path={mdiLogout} size={0.8} color={"red"} /> Odhlásit se
                            </NavDropdown.Item>
                        ) : (
                            <Form onSubmit={handleLoginSubmit} style={loginFormStyle()}>
                                <Form.Group controlId="formEmail" style={formGroupStyle()}>
                                    <Form.Label style={formLabelStyle()}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={loginFormData.email}
                                        onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                                        style={formControlStyle()}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" style={formGroupStyle()}>
                                    <Form.Label style={formLabelStyle()}>Heslo</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={loginFormData.password}
                                        onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                                        style={formControlStyle()}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={loginButtonStyle()}>
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
        backgroundColor: "#343a40",
        padding: "8px 16px",
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
        backgroundColor: "#007bff",
        border: "none",
    };
}

function navLinkStyle() {
    return {
        color: "white",
        fontWeight: "bold",
        margin: "0 10px",
    };
}

function dropdownStyle() {
    return {
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f8f9fa",
    };
}

function dropdownItemStyle() {
    return {
        color: "#000",
        padding: "10px 20px",
    };
}

function formLabelStyle() {
    return {
        color: "#000",
        fontWeight: "bold",
    };
}

function formControlStyle() {
    return {
        borderRadius: "4px",
        border: "1px solid #ced4da",
    };
}

function loginButtonStyle() {
    return {
        marginTop: '10px',
        width: '100%',
        backgroundColor: "#007bff",
        border: "none",
        padding: "8px 12px",
    };
}

function loginFormStyle() {
    return {
        padding: '10px',
        width: '300px',
    };
}

function formGroupStyle() {
    return {
        marginBottom: '15px',
    };
}

export default NavBar;
