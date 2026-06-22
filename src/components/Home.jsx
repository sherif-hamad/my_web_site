import React from 'react';
import './Home.css';

const Home = ({ onNavigate }) => {
    const goTo = (page) => (e) => {
        e.preventDefault();
        if (onNavigate) onNavigate(page);
    };

    return (
        <div className="home">
            <header className="hero">
                <div className="hero-inner">
                    <img className="hero-photo" src="/sherif.jpg" alt="Sherif Hamad" />
                    <div className="hero-text">
                        <h1>Hi, I'm <span>Sherif</span></h1>
                        <p>
                            Software engineer, embedded systems enthusiast, musician
                            and music producer. I build things where software meets
                            hardware — from testing frameworks to ESP32 audio projects
                            and DSP experiments — and when I'm not coding, I'm composing,
                            recording, and producing music.
                        </p>
                        <a className="home-button" href="#about">Discover my journey</a>
                    </div>
                </div>
            </header>

            <section id="about">
                <h2>About Me</h2>
                <p>
                    I am an engineer originally from Egypt and currently based in Berlin.
                    My passion is understanding how things work and turning ideas into
                    real, working systems.
                </p>
                <p>
                    My journey combines software engineering, quality engineering,
                    embedded development, electronics, and audio technology.
                </p>
            </section>

            <section>
                <h2>What I Do</h2>
                <div className="cards">
                    <div className="home-card">
                        <h3>🧪 Quality & Software Engineering</h3>
                        <p>
                            I design better testing workflows, automate processes,
                            and use modern tools including AI to improve engineering productivity.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3>⚡ Embedded Systems</h3>
                        <p>
                            I build projects with microcontrollers like ESP32 and STM32,
                            working close to hardware and firmware.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3>🎵 Audio & DSP</h3>
                        <p>
                            I explore digital signal processing, I2S audio,
                            DAC/ADC systems, microphones, and audio applications.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3>💡 Maker & Electronics</h3>
                        <p>
                            I enjoy learning electronics by building:
                            circuits, prototypes, and creative devices.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Projects I Love</h2>
                <div className="cards">
                    <div className="home-card">
                        <h3>ESP32 Audio Lab</h3>
                        <p>
                            MP3 playback, SD cards, I2S microphones,
                            PCM ADC/DAC experiments and real-time audio processing.
                        </p>
                    </div>
                    <a className="home-card" href="#music" onClick={goTo('music')} style={{ textDecoration: 'none' }}>
                        <h3>Music Technology</h3>
                        <p>
                            Exploring samplers, drum machines, and ways to combine
                            creativity with engineering. Visit my music page →
                        </p>
                    </a>
                    <div className="home-card">
                        <h3>Developer Tools</h3>
                        <p>
                            Creating tools that make testing and development easier
                            for myself and my team.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Skills</h2>
                <div className="skills">
                    <span>C/C++</span>
                    <span>Python</span>
                    <span>Java</span>
                    <span>Embedded C</span>
                    <span>ESP-IDF</span>
                    <span>STM32</span>
                    <span>FreeRTOS</span>
                    <span>API Testing</span>
                    <span>Automation</span>
                    <span>DSP</span>
                    <span>Audio Systems</span>
                </div>
            </section>

            <section>
                <h2>Beyond Engineering</h2>
                <p>
                    When I'm away from code, I enjoy playing music, swimming,
                    biking, and cooking for people I care about.
                </p>
                <p className="highlight">Curiosity is my favorite tool.</p>
                <p style={{ marginTop: '20px' }}>
                    <a className="home-button" href="#music" onClick={goTo('music')}>
                        Explore my music →
                    </a>
                </p>
            </section>

            <div className="home-footer">
                © Sherif — Engineer, Builder, Creator
            </div>
        </div>
    );
};

export default Home;
