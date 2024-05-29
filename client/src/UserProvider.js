import React, { createContext, useState, useEffect, useMemo } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userLoadObject, setUserLoadObject] = useState({
        state: "ready",
        error: null,
        data: [],
    });

    useEffect(() => {
        handleLoadUsers();
    }, []);

    const handleLoadUsers = async () => {
        try {
            setUserLoadObject((current) => ({ ...current, state: "pending" }));
            const response = await fetch(`http://localhost:8000/users/list`, {
                method: "GET",
            });
            if (response.ok) {
                const responseJson = await response.json();
                setUserLoadObject({ state: "ready", data: responseJson });
            } else {
                const errorResponse = await response.json();
                setUserLoadObject((current) => ({
                    state: "error",
                    data: current.data,
                    error: errorResponse.message,
                }));
                console.error("Error loading users:", JSON.stringify(errorResponse, null, 2));
            }
        } catch (error) {
            setUserLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: error.message,
            }));
            console.error("Error loading users:", error.message);
        }
    };

    const handleCreateUser = async (dtoIn) => {
        try {
            setUserLoadObject((current) => ({ ...current, state: "pending" }));
            const response = await fetch(`http://localhost:8000/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoIn),
            });
            if (response.ok) {
                const responseJson = await response.json();
                setUserLoadObject((current) => ({
                    state: "ready",
                    data: [...current.data, responseJson],
                }));
            } else {
                const errorResponse = await response.json();
                setUserLoadObject((current) => ({
                    state: "error",
                    data: current.data,
                    error: errorResponse.message,
                }));
                console.error("Error creating user:", JSON.stringify(errorResponse, null, 2));
            }
        } catch (error) {
            setUserLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: error.message,
            }));
            console.error("Error creating user:", error.message);
        }
    };

    const value = useMemo(() => ({
        state: userLoadObject.state,
        userList: userLoadObject.data || [],
        handlerMap: { handleCreateUser, handleLoadUsers },
    }), [userLoadObject]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
