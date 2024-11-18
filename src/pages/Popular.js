import React, { useEffect, useState } from 'react';
import { fetchPopularDramas } from '../api/tmdb'; // Fungsi API untuk mengambil data drama populer
import { Link } from 'react-router-dom';
import './Popular.css'; // Pastikan untuk mengimpor CSS yang akan dibuat

const Popular = () => {
  const [dramas, setDramas] = useState([]);

  useEffect(() => {
    const loadDramas = async () => {
      const data = await fetchPopularDramas();
      setDramas(data);
    };
    loadDramas();
  }, []);

  return (
    <div className="popular-container">
      <h1>Drama Populer</h1>
      <div className="popular-drama-grid">
        {dramas.map((drama) => (
          <div className="popular-drama-card" key={drama.id}>
            <Link to={`/detail/${drama.id}`}>
              <img
                src={
                  drama.poster_path
                    ? `https://image.tmdb.org/t/p/w500${drama.poster_path}`
                    : '/default-poster.jpg' // Gambar default jika poster tidak ada
                }
                alt={drama.name || drama.title}
                className="popular-drama-poster"
              />
              <div className="popular-drama-title">{drama.name || drama.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
