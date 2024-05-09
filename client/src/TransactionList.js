import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext); // Zde získáte funkci handleDelete
    const [showTransactionForm, setShowTransactionForm] = useState(false);

    // Filtrace transakcí (např. podle data)
    const filteredTransactionList = transactionList.filter(
        (transaction) => new Date(transaction.date) > new Date()
    );

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Button variant="success" onClick={() => setShowTransactionForm({})}>
                    <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
                    transakce
                </Button>
            </div>
            {/* Zobrazit transakční formulář */}
            {!!showTransactionForm && (
                <TransactionForm
                    transaction={showTransactionForm}
                    setShowTransactionForm={setShowTransactionForm}
                />
            )}
            {/* Zobrazit transakční karty */}
            {filteredTransactionList.map((transaction) => {
                return (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        setShowTransactionForm={setShowTransactionForm}
                        handleDelete={handlerMap.handleDelete}
                    />
                );
            })}
        </Container>
    );
}

export default TransactionList;
