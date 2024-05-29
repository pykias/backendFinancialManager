import React, { createContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userLoadObject, setUserLoadObject] = useState({ state: 'ready', data: [], error: null });
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLoadUsers = async () => {
        try {
            setUserLoadObject(prevState => ({ ...prevState, state: 'pending' }));
            const response = await fetch('http://localhost:8000/user/list');
            if (response.ok) {
                const users = await response.json();
                setUserLoadObject({ state: 'ready', data: users, error: null });
            } else {
                const error = await response.json();
                setUserLoadObject({ state: 'error', data: [], error: error.message });
            }
        } catch (error) {
            setUserLoadObject({ state: 'error', data: [], error: error.message });
        }
    };

    const handleCreateUser = async (user) => {
        try {
            setUserLoadObject(prevState => ({ ...prevState, state: 'pending' }));
            const response = await fetch('http://localhost:8000/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user), // ujistěte se, že user obsahuje { name, email, password }
            });
            if (response.ok) {
                await handleLoadUsers();
            } else {
                const error = await response.json();
                setUserLoadObject(prevState => ({ state: 'error', data: prevState.data, error: error.message }));
            }
        } catch (error) {
            setUserLoadObject(prevState => ({ state: 'error', data: prevState.data, error: error.message }));
        }
    };

    const handleLogin = async (credentials) => {
        try {
            setUserLoadObject(prevState => ({ ...prevState, state: 'pending' }));
            const response = await fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials), // ujistěte se, že credentials obsahuje { email, password }
            });
            if (response.ok) {
                const user = await response.json();
                setLoggedInUser(user);
                setUserLoadObject(prevState => ({ state: 'ready', data: prevState.data, error: null }));
            } else {
                const error = await response.json();
                setUserLoadObject(prevState => ({ state: 'error', data: [], error: error.message }));
            }
        } catch (error) {
            setUserLoadObject(prevState => ({ state: 'error', data: [], error: error.message }));
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };

    const handleDeleteUser = async (userId) => {
        try {
            setUserLoadObject(prevState => ({ ...prevState, state: 'pending' }));
            const response = await fetch('http://localhost:8000/user/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId }),
            });
            if (response.ok) {
                await handleLoadUsers();
                setUserLoadObject(prevState => ({ state: 'ready', data: prevState.data, error: null }));
            } else {
                const error = await response.json();
                setUserLoadObject(prevState => ({ state: 'error', data: prevState.data, error: error.message }));
            }
        } catch (error) {
            setUserLoadObject(prevState => ({ state: 'error', data: prevState.data, error: error.message }));
        }
    };

    useEffect(() => {
        handleLoadUsers();
    }, []);

    const contextValue = useMemo(() => ({
        userList: userLoadObject.data,
        loggedInUser,
        handlerMap: { handleLoadUsers, handleCreateUser, handleLogin, handleLogout, handleDeleteUser },
    }), [userLoadObject, loggedInUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
