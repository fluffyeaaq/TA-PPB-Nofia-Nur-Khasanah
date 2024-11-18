import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FavoriteContext } from '../context/FavoriteContext'; // Import FavoriteContext
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext); // Use context

  // Fungsi ini digunakan untuk menambah atau menghapus drama dari favorit
  const handleFavoriteClick = () => {
    // Cek apakah id ada, jika tidak, beri peringatan
    if (!drama || !drama.id) {
      console.warn("Drama ID is missing!");
      return;
    }
    
    console.log("Drama ID:", drama.id); // Untuk debugging, memastikan id tersedia
    if (isFavorite) {
      removeFavorite(drama.id); // Hapus dari favorit jika sudah ditandai
    } else {
      addFavorite(drama); // Tambahkan ke favorit
    }
  };

  useEffect(() => {
    const loadDrama = async () => {
      const data = await fetchDramaDetails(id);
      setDrama(data);

      // Cek data drama yang di-fetch, pastikan id ada
      console.log("Fetched Drama:", data); // Debugging line

      // Fetching reviews
      const reviewsData = await fetchDramaReviews(id);
      setReviews(reviewsData);
    };
    loadDrama();
  }, [id]);

  const fetchDramaDetails = async (dramaId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${dramaId}?api_key=21ce46dc5f0bfbbb2b40cc681ae09c28&language=id-ID`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching drama details:', error);
      return null;
    }
  };

  const fetchDramaReviews = async (dramaId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${dramaId}/reviews?api_key=21ce46dc5f0bfbbb2b40cc681ae09c28&language=id-ID`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching drama reviews:', error);
      return [];
    }
  };

  // Check if the current drama is already in favorites
  const isFavorite = favorites.some((favDrama) => favDrama.id === drama?.id);

  if (!drama) return <p>Loading...</p>;

  return (
    <div className="drama-detail">
      <h1>{drama.name}</h1>
      <img 
        src={drama.poster_path ? `https://image.tmdb.org/t/p/w500${drama.poster_path}` : '/default-poster.jpg'} 
        alt={drama.name} 
        className="drama-poster" 
      />
      <p>{drama.overview}</p>
      <p>Rating: {drama.vote_average} / 10</p>
      <p>
        <i className="fas fa-tags"></i> Genre: {drama.genres.map(genre => genre.name).join(', ')}
      </p>
      <p>
        <i className="fas fa-calendar-alt"></i> Tahun Rilis: {new Date(drama.first_air_date).getFullYear()}
      </p>
      <p>
        <i className="fas fa-film"></i> Jumlah Episode: {drama.number_of_episodes}
      </p>
      <p>
        <i className="fas fa-clock"></i> Durasi Episode: {drama.episode_run_time[0]} menit
      </p>

      {/* Button untuk menambah/hapus dari Favorite */}
      <button onClick={handleFavoriteClick} className="favorite-button">
        {isFavorite ? 'Hapus dari Favorite' : 'Tambahkan ke Favorite'}
      </button>

      <h2>Ulasan</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.author}</strong>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada ulasan untuk drama ini.</p>
      )}
    </div>
  );
};

export default Detail;
