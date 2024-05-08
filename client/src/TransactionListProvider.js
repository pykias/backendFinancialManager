import { useEffect, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

function TransactionListProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/list`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setTransactionLoadObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleCreate(dtoIn) {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setTransactionLoadObject((current) => {
                current.data.push(responseJson);
                current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setTransactionLoadObject((current) => {
                return { state: "error", data: current.data, error: responseJson };
            });
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleUpdate(dtoIn) {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setTransactionLoadObject((current) => {
                const transactionIndex = current.data.findIndex(
                    (t) => t.id === responseJson.id
                );
                current.data[transactionIndex] = responseJson;
                current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: transactionLoadObject.state,
        transactionList: transactionLoadObject.data || [],
        handlerMap: { handleCreate, handleUpdate },
    };

    return (
        <TransactionListContext.Provider value={value}>
            {children}
        </TransactionListContext.Provider>
    );
}

export default TransactionListProvider;
