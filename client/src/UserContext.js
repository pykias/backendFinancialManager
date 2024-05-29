import { createContext } from "react";

export const UserContext = createContext({
    state: "ready",
    userList: [],
    handlerMap: {
        handleCreateUser: async (user) => {},
        handleUpdateUser: async (user) => {},
        handleDeleteUser: async (userId) => {},
        handleLoadUsers: async () => {}
    }
});
