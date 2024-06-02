import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionContext } from "./TransactionContext.js";

function TransactionProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    });
    const [searchParams] = useSearchParams();

    const handleLoad = useCallback(async () => {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const transactionId = searchParams.get("id");
        if (!transactionId) {
            console.log("No transaction ID provided.");
            return;
        }
        const response = await fetch(`http://localhost:8000/transaction/get?id=${transactionId}`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setTransactionLoadObject({ state: "ready", data: responseJson });
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }, [searchParams]);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const value = {
        transaction: transactionLoadObject.data,
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

export default TransactionProvider;
