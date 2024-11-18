import React, { useEffect, useState } from 'react';
import { fetchLatestDrama, fetchUpcomingDramas } from '../api/tmdb';
import './Home.css';

const Home = () => {
  const [latestDramas, setLatestDramas] = useState([]); // State untuk menyimpan drama terbaru
  const [upcomingDramas, setUpcomingDramas] = useState([]);

  useEffect(() => {
    const loadDramas = async () => {
      const latest = await fetchLatestDrama();
      const upcoming = await fetchUpcomingDramas();
      setLatestDramas(latest); // Mengisi state dengan drama terbaru
      setUpcomingDramas(upcoming);
    };
    loadDramas();
  }, []);

  return (
    <div className="home-container">
      <h1>Drama Terbaru</h1>
      <div className="latest-drama-grid">
        {latestDramas.map((drama) => (
          <div className="latest-drama-card" key={drama.id}>
            <a href={`/detail/${drama.id}`}>
              <img
                src={
                  drama.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${drama.backdrop_path}`
                    : '/default-poster.jpg' // Gambar default jika backdrop tidak ada
                }
                alt={drama.name || drama.title}
                className="drama-backdrop"
              />
              <div className="latest-drama-title">{drama.name || drama.title}</div>
            </a>
          </div>
        ))}
      </div>

      <h1>Drama Mendatang</h1>
      <div className="upcoming-drama-grid">
        {upcomingDramas.map((drama) => (
          <div className="drama-card" key={drama.id}>
            <div className="drama-image">
              <img
                src={
                  drama.poster_path
                    ? `https://image.tmdb.org/t/p/w500${drama.poster_path}`
                    : '/default-poster.jpg'
                }
                alt={drama.name || drama.title}
              />
              <a href={`/detail/${drama.id}`} className="detail-label">Detail</a>
            </div>
            <div className="drama-title">
              {drama.name || drama.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
