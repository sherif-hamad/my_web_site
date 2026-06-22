import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ currentPage, onNavigate }) => {
    const [open, setOpen] = useState(false);

    const go = (page) => (e) => {
        e.preventDefault();
        setOpen(false);
        if (onNavigate) onNavigate(page);
    };

    return (
        <nav className="site-nav">
            <div className="site-nav-inner">
                <a className="site-nav-brand" href="#home" onClick={go('home')}>Sherif Hamad</a>
                <button
                    className="site-nav-toggle"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <ul className={`site-nav-links ${open ? 'open' : ''}`}>
                    <li>
                        <a
                            href="#home"
                            className={currentPage === 'home' ? 'active' : ''}
                            onClick={go('home')}
                        >Home</a>
                    </li>
                    <li>
                        <a
                            href="#music"
                            className={currentPage === 'music' ? 'active' : ''}
                            onClick={go('music')}
                        >Music</a>
                    </li>
                    <li>
                        <a href="/audio-tools/">Audio Tools</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
