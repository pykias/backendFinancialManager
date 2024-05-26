import React, { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext";
import { UserContext } from "./UserContext";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import Button from "react-bootstrap/Button";

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext);
    const { loggedInUser } = useContext(UserContext);
    const [showTransactionForm, setShowTransactionForm] = useState(null);

    return (
        <div>
            <h2>Transakce</h2>
            {loggedInUser && (
                <Button onClick={() => setShowTransactionForm({})} style={{ marginBottom: "15px" }}>
                    Nová transakce
                </Button>
            )}
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
        </div>
    );
}

export default TransactionList;
