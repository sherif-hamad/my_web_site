import React from 'react';
import './Music.css';
import Section from './Section';
import CardsGroup from './CardsGroup';
import YouTubeVideo from './YouTubeVideo';

const Music = () => {
    return (
        <div className="music-page">
            <Section id="about" title="Welcome to My World of Music!">
                <p>Hello! I’m Sherif Hamad, a passionate musician driven by the art of crafting new and inspiring sounds every day. Music is not just a creative outlet for me—it’s a journey through emotions, stories, and life itself. Whether it’s composing original pieces or reimagining melodies, my goal is to connect, uplift, and resonate with listeners. Dive into my projects, explore my musical journey, and let’s share the beauty of sound together!</p>
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
                    <p>Music that resembles my life journey and thoughts</p>
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
                    <p>Songs reflecting faith, reflection, and the inner journey.</p>
                    <div className="video-container">
                        <YouTubeVideo videoId="vvX4UBq_Qlo" />
                        <YouTubeVideo videoId="juzSkqy4XZk" />
                        <YouTubeVideo videoId="l1eEj8ZTOKE" />
                        <YouTubeVideo videoId="-yW9ATP_Cts" />
                    </div>
                </div>
                <div className="card">
                    <h3>Revolution Songs</h3>
                    <p>Music written for protest, hope, and the voices that needed to be heard.</p>
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
            <Section id="contact" title="Contact Me">
                <p>If you'd like to get in touch, feel free to reach out via email at <a href="mailto:sherif.hamad@live.com">sherif.hamad@live.com</a>...</p>
            </Section>
        </div>
    );
};

export default Music;
