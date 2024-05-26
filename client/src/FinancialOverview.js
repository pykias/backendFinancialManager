import React, { useContext } from "react";
import { TransactionListContext } from "./TransactionListContext";

function FinancialOverview() {
    const { transactionList } = useContext(TransactionListContext);

    const totalIncome = transactionList
        .filter(transaction => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactionList
        .filter(transaction => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    return (
        <div style={containerStyle()}>
            <h2 style={headingStyle()}>Financial Overview</h2>
            <div style={overviewContainerStyle()}>
                <p style={incomeStyle()}>Total Income: {totalIncome.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
                <p style={expenseStyle()}>Total Expense: {totalExpense.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
                <p style={balanceStyle()}>Total Balance: {totalBalance.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
            </div>
        </div>
    );
}

function containerStyle() {
    return {
        padding: "16px",
        margin: "16px auto",
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    };
}

function headingStyle() {
    return {
        textAlign: "center",
        color: "#0277bd",
        marginBottom: "24px"
    };
}

function overviewContainerStyle() {
    return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px"
    };
}

function incomeStyle() {
    return {
        color: "#2e7d32",
        fontSize: "18px",
        margin: "4px 0"
    };
}

function expenseStyle() {
    return {
        color: "#d32f2f",
        fontSize: "18px",
        margin: "4px 0"
    };
}

function balanceStyle() {
    return {
        fontSize: "18px",
        margin: "4px 0"
    };
}

export default FinancialOverview;
