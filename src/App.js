import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Music from './components/Music';
import './App.css';

function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'music' ? 'music' : 'home';
  });

  const navigate = (next) => {
    setPage(next);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '');
      setPage(hash === 'music' ? 'music' : 'home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="App">
      <NavBar currentPage={page} onNavigate={navigate} />
      {page === 'home' ? <Home onNavigate={navigate} /> : <Music />}
      <Footer />
    </div>
  );
}

export default App;
