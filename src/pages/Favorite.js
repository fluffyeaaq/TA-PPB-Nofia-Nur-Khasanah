import React, { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import './Favorite.css';

const Favorite = () => {
    const { favorites, removeFavorite } = useContext(FavoriteContext);

    return (
        <div className="container">
            <h1>Favorite Drama</h1>
            {favorites.length === 0 ? (
                <p>Tidak ada drama favorit.</p>
            ) : (
                <ul>
                    {favorites.map((drama) => (
                        <li key={drama.id}>
                            <h2>{drama.name}</h2>
                            <img 
                                src={drama.poster_path ? `https://image.tmdb.org/t/p/w500${drama.poster_path}` : '/default-poster.jpg'} 
                                alt={drama.name} 
                                className="favorite-poster" 
                            />
                            <p>{drama.overview}</p>
                            <button onClick={() => removeFavorite(drama.id)}>
                                Hapus dari Favorite
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorite;
