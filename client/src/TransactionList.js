import React, { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext";
import { UserContext } from "./UserContext";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext);
    const { loggedInUser } = useContext(UserContext);
    const [showTransactionForm, setShowTransactionForm] = useState(null);

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                {loggedInUser && (
                    <Button variant="primary" onClick={() => setShowTransactionForm({})}>
                        <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová transakce
                    </Button>
                )}
            </div>
            <h2>Transakce</h2>
            {transactionList.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    setShowTransactionForm={setShowTransactionForm}
                    onDelete={handlerMap.handleDelete}
                />
            ))}
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
