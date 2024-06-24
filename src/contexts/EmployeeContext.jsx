import { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        } catch (e) {
            console.error('Failed to parse favorites from localStorage:', e);
            return [];
        }
    });

    const addToFavorites = (employee) => {
        if (!favorites.some(fav => fav.login.uuid === employee.login.uuid)) {
            const updatedFavorites = [...favorites, employee];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    const removeFromFavorites = (employee) => {
        const updatedFavorites = favorites.filter(fav => fav.login.uuid !== employee.login.uuid);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees, favorites, setFavorites, addToFavorites, removeFromFavorites }}>
            {children}
        </EmployeeContext.Provider>
    );
};