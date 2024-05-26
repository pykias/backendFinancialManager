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
        <Navbar expand="lg" style={componentStyle()} className="shadow-sm">
            <Container>
                <Navbar.Brand>
                    <Button style={brandStyle()} onClick={() => navigate("/")} className="shadow-lg">
                        <Icon path={mdiBank} size={1.2} color={"white"} />
                        Finanční Aplikace
                    </Button>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={() => navigate("/")}>Transakce</Nav.Link> {/* Přidáno */}
                    <Nav.Link onClick={() => navigate("/financialOverview")}>Finanční Přehled</Nav.Link> {/* Přidáno */}
                    <NavDropdown
                        title={loggedInUser ? loggedInUser.name : "Login"}
                        drop={"start"}
                        style={dropdownStyle()}
                    >
                        {getUserMenuList({ userList, loggedInUser, handlerMap })}
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
