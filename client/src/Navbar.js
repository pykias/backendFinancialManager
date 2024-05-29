import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Icon from "@mdi/react";
import { mdiBank, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/Button";

function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" style={navbarStyle()} className="shadow-sm">
            <Container>
                <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
                    <Icon path={mdiBank} size={1.5} color="white" />
                    <Button onClick={() => navigate("/")} style={brandButtonStyle()}>
                        Finanční Aplikace
                    </Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/")} style={navLinkStyle()}>Transakce</Nav.Link>
                        <Nav.Link onClick={() => navigate("/financialOverview")} style={navLinkStyle()}>Finanční Přehled</Nav.Link>
                        <Nav.Link onClick={() => navigate("/users")} style={navLinkStyle()}>Uživatelé</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={loggedInUser ? loggedInUser.name : "Login"}
                            id="basic-nav-dropdown"
                            align="end"
                            style={navDropdownStyle()}
                        >
                            {getUserMenuList({ userList, loggedInUser, handlerMap })}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function navbarStyle() {
    return {
        backgroundColor: "#343a40",
        padding: "10px 20px",
        borderBottom: "2px solid #007bff",
    };
}

function brandButtonStyle() {
    return {
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        fontSize: "1.2em",
        fontWeight: "bold",
        marginLeft: "10px",
    };
}

function navLinkStyle() {
    return {
        color: "white",
        marginRight: "15px",
    };
}

function navDropdownStyle() {
    return {
        color: "white",
    };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
    const userMenuItemList = userList.map((user) => (
        <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
            {user.name}
        </NavDropdown.Item>
    ));

    if (loggedInUser) {
        userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
        userMenuItemList.push(
            <NavDropdown.Item
                key={"logout"}
                onClick={() => handlerMap.logout()}
                style={{ color: "red" }}
            >
                <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlásit se"}
            </NavDropdown.Item>
        );
    }

    return userMenuItemList;
}

export default NavBar;
