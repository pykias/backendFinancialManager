import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import './TransactionCard.css'; // Import the CSS file

function TransactionCard({ transaction, setShowTransactionForm, onDelete }) {
    const isIncome = transaction.type === "income";
    const cardStyle = {
        borderLeft: `5px solid ${isIncome ? "green" : "red"}`,
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
                        onClick={() => onDelete(transaction.id)}
                        className="minimalist-button-action"
                    >
                        Smazat
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TransactionCard;
