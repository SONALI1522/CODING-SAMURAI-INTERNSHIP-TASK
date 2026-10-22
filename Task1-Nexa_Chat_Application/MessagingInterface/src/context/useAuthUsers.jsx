import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const getAuthUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/user/me",
                    {
                        withCredentials: true
                    }
                );

                setAuthUser(response.data);
            } catch (error) {
                console.log("Error getting auth user:", error);
            }
        };

        getAuthUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;