import { useContext, useState, useMemo } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

import Button from "react-bootstrap/Button";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import Container from "react-bootstrap/Container";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";

function TransactionList() {
    const { transactionList = [], handlerMap } = useContext(TransactionListContext); // Add handlerMap to destructuring
    const [showTransactionForm, setShowTransactionForm] = useState(false);

    // Optimalizované filtrování s useMemo
    const filteredTransactionList = useMemo(() =>
            transactionList.filter(transaction => new Date(transaction.date) > new Date()),
        [transactionList]
    );

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Button variant="success" onClick={() => setShowTransactionForm({})}>
                    <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová transakce
                </Button>
                <Button variant="success" disabled>
                    <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} /> Nové transakce
                </Button>
            </div>
            {showTransactionForm && (
                <TransactionForm
                    transaction={showTransactionForm}
                    setShowTransactionForm={setShowTransactionForm}
                />
            )}
            {filteredTransactionList.map(transaction => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    setShowTransactionForm={setShowTransactionForm}
                    handleDelete={handlerMap.handleDelete} // Pass handleDelete to TransactionCard
                />
            ))}
        </Container>
    );
}

export default TransactionList;
