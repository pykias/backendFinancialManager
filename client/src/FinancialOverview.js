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
        <div>
            <h2>Financial Overview</h2>
            <div>
                <p>Total Income: {totalIncome.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
                <p>Total Expense: {totalExpense.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
                <p>Total Balance: {totalBalance.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}</p>
            </div>
        </div>
    );
}

export default FinancialOverview;
