import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navigation-bar">
            <Link to="/">Home</Link>
            <Link to="/popular">Popular</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/favorite">Favorite</Link>
        </div>
    );
};

export default Navbar;
