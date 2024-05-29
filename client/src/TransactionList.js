import React, { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext";
import { UserContext } from "./UserProvider";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './TransactionList.css'; // Import the CSS file

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext);
    const { loggedInUser } = useContext(UserContext);
    const [showTransactionForm, setShowTransactionForm] = useState(null);

    return (
        <Container className="minimalist-container">
            <h2 className="minimalist-title">Transakce</h2>
            {loggedInUser && (
                <Button
                    variant="primary"
                    onClick={() => setShowTransactionForm({})}
                    className="minimalist-button"
                >
                    Nová transakce
                </Button>
            )}
            <Row>
                {transactionList.map((transaction) => (
                    <Col key={transaction.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <TransactionCard
                            transaction={transaction}
                            setShowTransactionForm={setShowTransactionForm}
                        />
                    </Col>
                ))}
            </Row>
            {showTransactionForm && (
                <TransactionForm
                    transaction={showTransactionForm}
                    onHide={() => setShowTransactionForm(null)}
                    onSave={(savedTransaction) => {
                        if (showTransactionForm.id) {
                            handlerMap.handleUpdate(savedTransaction);
                        } else {
                            handlerMap.handleCreate(savedTransaction);
                        }
                        setShowTransactionForm(null);
                    }}
                />
            )}
        </Container>
    );
}

export default TransactionList;
