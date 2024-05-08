// Layout.js
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
    return (
        <>
            <div className="header">
                <Navbar/>
            </div>
            <div style={bodyStyle()}>
                <Outlet />
            </div>
            <div className="footer text-light" style={footerStyle()}>
                © Finanční Aplikace
            </div>
        </>
    );
};

function bodyStyle() {
    return {
        overflow: "auto",
        padding: "16px",
        flex: "1",
        borderTop: "white 2px solid",
        borderBottom: "white 2px solid",
        backgroundColor: "#f4f4f4"  // Neutrální pozadí pro obsah
    };
}

function footerStyle() {
    return {
        padding: "8px",
        textAlign: "center",
        backgroundColor: "#007bff",  // Modrá barva pro zápatí
        color: "#fff"
    };
}

export default Layout;
