import React, { useState, useEffect } from 'react';
import './SplashScreen.css'; 

const SplashScreen = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className={`splash-screen ${isLoaded ? 'loaded' : ''}`}>
            <h1>Drama Time</h1> {/* Tampilkan tulisan Drama Time */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4PwzfTwbcakQv3pGP8zcOa81axVQPwuxA&s" alt="Logo" />
        </div>
    );
};

export default SplashScreen;
