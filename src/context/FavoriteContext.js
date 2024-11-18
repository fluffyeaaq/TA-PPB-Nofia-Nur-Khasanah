import React, { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext({
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {},
});

const FavoriteProvider = ({ children }) => {
    // Inisialisasi `favorites` dari local storage jika ada, atau array kosong jika tidak ada
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Simpan `favorites` ke local storage setiap kali ada perubahan
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (drama) => {
        setFavorites((prevFavorites) => {
            // Cek apakah drama sudah ada di favorit untuk menghindari duplikasi
            if (!prevFavorites.some((item) => item.id === drama.id)) {
                const updatedFavorites = [...prevFavorites, drama];
                console.log("Added to favorites:", updatedFavorites); 
                return updatedFavorites;
            }
            console.log("Drama already in favorites:", prevFavorites);
            return prevFavorites;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((favorite) => favorite.id !== id);
            console.log("Removed from favorites:", updatedFavorites); 
            return updatedFavorites;
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;
