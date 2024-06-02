import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import './TransactionCard.css'; // Import the CSS file

function TransactionCard({ transaction, setShowTransactionForm, loggedInUser }) {
    const isIncome = transaction.type === "income";
    const cardStyle = {
        borderLeft: `5px solid ${isIncome ? "green" : "red"}`,
    };

    const handleDelete = async (transactionId) => {
        const confirmed = window.confirm("Opravdu chcete tuto transakci smazat?");
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8000/transaction/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: transactionId }),
            });
            if (response.ok) {
                setShowTransactionForm(null);
                window.location.reload();
            } else {
                const responseJson = await response.json();
                new Error(responseJson.message);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error.message);
        }
    };

    return (
        <Card style={cardStyle} className="minimalist-card">
            <Card.Body>
                <div className="minimalist-card-header">
                    <div>
                        <div className="minimalist-card-date">
                            {format(new Date(transaction.date), "d MMM yyyy HH:mm")}
                        </div>
                        <div className="minimalist-card-name">{transaction.name}</div>
                    </div>
                    <div className="minimalist-card-amount">
                        {transaction.amount.toLocaleString("cs-CZ", {
                            style: "currency",
                            currency: "CZK",
                        })}
                    </div>
                </div>
                {loggedInUser && (
                    <div className="minimalist-card-actions">
                        <Button
                            variant="primary"
                            onClick={() => setShowTransactionForm(transaction)}
                            className="minimalist-button-action"
                        >
                            Upravit
                        </Button>
                        <Button
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleDelete(transaction.id)}
                            className="minimalist-button-action"
                        >
                            Smazat
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default TransactionCard;
