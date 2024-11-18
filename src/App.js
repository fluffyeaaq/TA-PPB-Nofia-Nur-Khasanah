import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Profile from './pages/Profile';
import Favorite from './pages/Favorite';
import Detail from './pages/Detail';
import FavoriteProvider from './context/FavoriteContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SplashScreen from './components/SplashScreen';

const App = () => {
    const [showSplash, setShowSplash] = useState(() => {
        // Hanya tampilkan splash screen sekali saat aplikasi pertama kali dimuat
        return !sessionStorage.getItem('splashShown');
    });

    useEffect(() => {
        if (showSplash) {
            const timer = setTimeout(() => {
                setShowSplash(false);
                sessionStorage.setItem('splashShown', 'true'); // Tandai bahwa splash screen sudah ditampilkan
            }, 3000); // Durasi splash screen 3 detik

            return () => clearTimeout(timer); // Bersihkan timer saat komponen dibongkar
        }
    }, [showSplash]);

    return (
        <FavoriteProvider>
            <Router>
                {showSplash ? ( // Tampilkan SplashScreen jika masih true
                    <SplashScreen />
                ) : (
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/popular" element={<Popular />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/favorite" element={<Favorite />} />
                            <Route path="/detail/:id" element={<Detail />} />
                        </Routes>
                    </>
                )}
            </Router>
        </FavoriteProvider>
    );
};

export default App;
