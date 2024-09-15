import React from 'react';
import NavBar from './components/NavBar';
import Section from './components/Section';
import Footer from './components/Footer';
import './App.css';
import CardsGroup from './components/CardsGroup';
import YouTubeVideo from "./components/YouTubeVideo"
function App() {
  return (
    <div className="App">
      <NavBar />
      <Section id="about" title="About Me">
        <p>Hello! I'm Sherif Hamad, a passionate Software Engineer with a love for creating something new everyday</p>
        <CardsGroup />
      </Section>
      <Section id="projects" title="Sample of my musical projects">
        <div className="card">
          <h3>Alwan Baby TV</h3>
          <p>Alwan Baby TV is a YouTube channel for kids' songs</p>
          <a href="https://www.youtube.com/@AlwanBaby" target="_blank" rel="noopener noreferrer">Check it out</a>
        </div>
        <div className="card">
          <h3>Purposeful Musical Songs</h3>
          <p>Music that resemble my life journey and thoughs</p>
          <div className="video-container">
            <YouTubeVideo videoId="0rDXyc1sDx0" />
            <YouTubeVideo videoId="OGG-amD5Oqk" />
            <YouTubeVideo videoId="UsAN3Yf5atU" />
            <YouTubeVideo videoId="nlePHhe6vSQ" />
            <YouTubeVideo videoId="wZ5MDesRSuQ" />
          </div>
        </div>
        <div className="card">
          <h3>Religious and Spiritual Music</h3>
          <p>Introduction to your first blog post...</p>
          <div className="video-container">
            <YouTubeVideo videoId="vvX4UBq_Qlo" />
            <YouTubeVideo videoId="juzSkqy4XZk" />
            <YouTubeVideo videoId="l1eEj8ZTOKE" />
            <YouTubeVideo videoId="-yW9ATP_Cts" />

          </div>
        </div>
        <div className="card">
          <h3>Revolution Songs</h3>
          <p>Introduction to your first blog post...</p>
          <div className="video-container">
            <YouTubeVideo videoId="EeQMLn2xwm4" />
            <YouTubeVideo videoId="fBVMnq8DWSQ" />
            <YouTubeVideo videoId="P9uzOQTHwy4" />
            <YouTubeVideo videoId="tCKhpKWETjg" />
            <YouTubeVideo videoId="s6Rf66bVANE" />
            <YouTubeVideo videoId="eLYqefIu5Ho" />
            <YouTubeVideo videoId="_b1TNOlSnFU" />
          </div>
        </div>
      </Section>
      <Section id="blog" title="Blog">
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
