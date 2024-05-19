import { useEffect, useState, useMemo } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

function TransactionListProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: [],
    });

    useEffect(() => {
        handleLoad();
    }, []); //

    const handleLoad = async () => {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/list`, {
            method: "GET",
        });
        if (response.ok) {
            const responseJson = await response.json();
            setTransactionLoadObject({ state: "ready", data: responseJson });
        } else {
            const errorResponse = await response.json();
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: errorResponse.message,
            }));
            console.error("Error loading transactions:", JSON.stringify(errorResponse, null, 2));
        }
    };

    const handleCreate = async (dtoIn) => {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dtoIn),
        });
        if (response.ok) {
            const responseJson = await response.json();
            setTransactionLoadObject((current) => {
                const updatedData = [...current.data, responseJson];
                updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: updatedData };
            });
        } else {
            const errorResponse = await response.json();
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: errorResponse.message,
            }));
            console.error("Error creating transaction:", JSON.stringify(errorResponse, null, 2));
        }
    };

    const handleUpdate = async (dtoIn) => {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        if (response.ok) {
            const responseJson = await response.json();
            setTransactionLoadObject((current) => {
                const transactionIndex = current.data.findIndex(t => t.id === responseJson.id);
                const updatedData = [...current.data];
                updatedData[transactionIndex] = responseJson;
                updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                return { state: "ready", data: updatedData };
            });
        } else {
            const errorResponse = await response.json();
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: errorResponse.message,
            }));
            console.error("Error updating transaction:", JSON.stringify(errorResponse, null, 2));
        }
    };

    const handleDelete = async (transactionId) => {
        const confirmed = window.confirm("Opravdu chcete tuto transakci smazat?");
        if (!confirmed) return;

        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));

        try {
            const response = await fetch(`http://localhost:8000/transaction/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: transactionId }),
            });
            if (response.ok) {
                setTransactionLoadObject((current) => {
                    const updatedData = current.data.filter((t) => t.id !== transactionId);
                    return { state: "ready", data: updatedData };
                });
            } else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        } catch (error) {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: error.message,
            }));
            console.error("Error deleting transaction:", error.message);
        }
    };

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
