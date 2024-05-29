import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import TransactionList from "./TransactionList";
import FinancialOverview from "./FinancialOverview";
import {UserProvider} from "./UserProvider";
import TransactionListProvider from "./TransactionListProvider";
import TransactionProvider from "./TransactionProvider";
import TransactionRoute from "./TransactionRoute";
import UserList from "./UserList"; // Import UserList

function App() {
    return (
        <div style={componentStyle()}>
            <UserProvider>
                <TransactionListProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<TransactionList />} />
                                <Route path="financialOverview" element={<FinancialOverview />} />
                                <Route path="users" element={<UserList />} /> {/* Add this line */}
                                <Route
                                    path="eventDetail"
                                    element={
                                        <TransactionProvider>
                                            <TransactionRoute />
                                        </TransactionProvider>
                                    }
                                />
                                <Route path="*" element={"not found"} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TransactionListProvider>
            </UserProvider>
        </div>
    );
}

function componentStyle() {
    return {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#187bcd",
    };
}

export default App;
