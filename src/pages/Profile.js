import React, { useState, useEffect } from 'react'; 
import './Profile.css';

const Profile = () => {
    // Mengambil data dari local storage saat komponen pertama kali dirender
    const [username, setUsername] = useState(localStorage.getItem('username') || 'Nama Pengguna');
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'https://via.placeholder.com/150');
    const [nim, setNim] = useState(localStorage.getItem('nim') || 'NIM Anda'); // Tambahan NIM
    const [isEditing, setIsEditing] = useState(false);

    // Menyimpan perubahan ke local storage
    const handleSave = () => {
        localStorage.setItem('username', username);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('nim', nim); // Simpan NIM ke local storage
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div>
                <img
                    src={avatar}
                    alt="Avatar"
                    className="profile-avatar"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <h3 className="profile-username">{username}</h3>
                )}
            </div>
            {isEditing && (
                <div>
                    <input
                        type="text"
                        placeholder="URL Avatar"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="profile-avatar-input"
                    />
                </div>
            )}
            <div>
                {isEditing ? (
                    <input
                        type="text"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)} // Input untuk NIM
                        className="profile-input"
                    />
                ) : (
                    <h4 className="profile-nim">{nim}</h4> // Menampilkan NIM jika tidak dalam mode editing
                )}
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="profile-button">
                {isEditing ? 'Save' : 'Edit Profile'}
            </button>
            {isEditing && (
                <button onClick={handleSave} className="profile-save-button">
                    Save Changes
                </button>
            )}
        </div>
    );
};

export default Profile;
