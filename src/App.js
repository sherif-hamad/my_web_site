import React from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Section from './components/Section';
import Footer from './components/Footer';
import './App.css';
import CardsGroup from './components/CardsGroup';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Section id="about" title="About Me">
        <p>Hello! I'm Sherif Hamad, a passionate Software Engineer with a love for creating something new everyday</p>
        <CardsGroup />
      </Section>
      <Section id="projects" title="My Projects">
        <div className="card">
          <h3>Project 1</h3>
          <p>Description of your first project...</p>
        </div>
        <div className="card">
          <h3>Project 2</h3>
          <p>Description of your second project...</p>
        </div>
      </Section>
      <Section id="blog" title="Blog">
        <div className="card">
          <h3>Blog Post 1</h3>
          <p>Introduction to your first blog post...</p>
        </div>
        <div className="card">
          <h3>Blog Post 2</h3>
          <p>Introduction to your second blog post...</p>
        </div>
      </Section>
      <Section id="contact" title="Contact Me">
        <p>If you'd like to get in touch, feel free to reach out via email at <a href="mailto:sherif.hamad@live.com">sherif.hamad@live.com</a>...</p>
      </Section>
      <Footer />
    </div>
  );
}

export default App;
