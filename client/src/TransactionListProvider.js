import { useEffect, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

function TransactionListProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: [],
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
        dtoIn.amount = parseFloat(dtoIn.amount);

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
                const updatedData = [...current.data, responseJson];
                updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: updatedData };
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

    async function handleUpdate(dtoIn) {
        dtoIn.amount = parseFloat(dtoIn.amount);

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
                const updatedData = [...current.data];
                updatedData[transactionIndex] = responseJson;
                updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: updatedData };
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

    async function handleDelete(transactionId) {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: transactionId }),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setTransactionLoadObject((current) => {
                const updatedData = current.data.filter((t) => t.id !== transactionId);
                return { state: "ready", data: updatedData };
            });
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
        handlerMap: { handleCreate, handleUpdate, handleDelete },
    };

    return (
        <TransactionListContext.Provider value={value}>
            {children}
        </TransactionListContext.Provider>
    );
}

export default TransactionListProvider;
