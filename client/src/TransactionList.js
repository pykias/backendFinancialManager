import React, { useContext } from "react";
import { TransactionListContext } from "./TransactionListContext";
import TransactionCard from "./TransactionCard";

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext);

    if (!transactionList) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {transactionList.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={handlerMap.handleDelete}
                />
            ))}
        </div>
    );
}

export default TransactionList;
