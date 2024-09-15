import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <a href="/plex">Plex</a>
            <a href="/calibre">Calibre</a>
            <a href="/calibre-web">Calibre Web</a>
            <a href="/portainer">Portainer</a>
        </nav>
    );
};

export default NavBar;
