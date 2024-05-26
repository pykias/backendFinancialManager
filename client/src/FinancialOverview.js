// src/FinancialOverview.js
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

function FinancialOverview() {
    const [overview, setOverview] = useState({ totalTransactions: 0, totalAmount: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/financialoverview");
                const data = await response.json();
                setOverview(data);
            } catch (error) {
                console.error("Error fetching financial overview:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <h1>Financial Overview</h1>
            <p>Total Transactions: {overview.totalTransactions}</p>
            <p>Total Amount: {overview.totalAmount.toLocaleString("cs-CZ", {
                style: "currency",
                currency: "CZK",
            })}</p>
        </Container>
    );
}

export default FinancialOverview;
