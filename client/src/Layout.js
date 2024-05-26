import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.js";

const Layout = () => {
    return (
        <>
            <div style={headerStyle()} className="shadow-lg">
                <NavBar />
            </div>
            <div style={bodyStyle()} className="rounded shadow-sm">
                <Outlet />
            </div>
            <div style={footerStyle()} className="rounded-top shadow-lg">
                © Finanční Aplikace
            </div>
        </>
    );
};

function headerStyle() {
    return {
        background: "linear-gradient(90deg, #007bff, #5a67d8)",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
        color: "#fff"
    };
}

function bodyStyle() {
    return {
        overflow: "auto",
        padding: "24px",
        flex: "1",
        backgroundColor: "#f9f9f9",  // Light neutral background
        borderTop: "2px solid #ccc",
        borderBottom: "2px solid #ccc"
    };
}

function footerStyle() {
    return {
        padding: "12px",
        textAlign: "center",
        background: "linear-gradient(90deg, #007bff, #5a67d8)",
        color: "#fff",
        borderRadius: "8px 8px 0 0",
        marginTop: "16px"
    };
}

export default Layout;
