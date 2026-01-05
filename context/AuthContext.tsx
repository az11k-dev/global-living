'use client';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {User} from "@/types";

// Описываем, какие данные мы будем хранить
interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    user: User; // Тут можно описать тип пользователя (name, email и т.д.)
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState("");

    // При загрузке проверяем, был ли пользователь залогинен (например, в localStorage)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
        if (savedToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData: User, token: string) => {
        setIsLoggedIn(true);
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем, чтобы не разлогинило при обновлении
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    );
}

// Хук, чтобы легко доставать данные в любом компоненте
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};