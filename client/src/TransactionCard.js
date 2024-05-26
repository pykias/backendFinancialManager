import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";

function TransactionCard({ transaction, setShowTransactionForm, onDelete }) {
    return (
        <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontSize: "20px" }}>
                            {format(new Date(transaction.date), "d MMM yyyy HH:mm")}
                        </div>
                        <div style={{ fontSize: "30px" }}>{transaction.name}</div>
                    </div>
                    <div style={{ fontSize: "30px" }}>
                        {transaction.amount.toLocaleString("cs-CZ", {
                            style: "currency",
                            currency: "CZK",
                        })}
                    </div>
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Button
                        variant="primary"
                        onClick={() => setShowTransactionForm(transaction)}
                    >
                        Upravit
                    </Button>
                    <Button
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => onDelete(transaction.id)}
                    >
                        Smazat
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TransactionCard;
