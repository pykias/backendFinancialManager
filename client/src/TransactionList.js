import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";

function TransactionList() {
    const { transactionList } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);

    // Zatim me nenapadlo nic lepsiho
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
                <Button variant="success" disabled>
                    <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
                    Nové transakce
                </Button>
            </div>
            {!!showTransactionForm ? (
                <TransactionForm
                    transaction={showTransactionForm}
                    setShowTransactionForm={setShowTransactionForm}
                />
            ) : null}
            {filteredTransactionList.map((transaction) => {
                return (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        setShowTransactionForm={setShowTransactionForm}
                    />
                );
            })}
        </Container>
    );
}

export default TransactionList;
