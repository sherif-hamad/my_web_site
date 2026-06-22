import React from 'react';
import './CardsGroup.css';
import studio from '../assets/studio1.jpg';
import playingKeys from '../assets/studio2.jpg';
import bigStudio from '../assets/studio3.jpg';

const cardData = [
    {
        title: 'Writing Music',
        text: "I'm a music producer and composer with a passion for orchestra.",
        imgSrc: studio,
    },
    {
        title: 'Playing Keys',
        text: 'I play many instruments, especially keys and violin.',
        imgSrc: playingKeys,
    },
    {
        title: 'In Studio',
        text: "I'm a recording and mix engineer, hands-on across different tools and techniques.",
        imgSrc: bigStudio,
    },
];

const CardsGroup = () => (
    <div className="music-cards-group">
        {cardData.map((card) => (
            <article className="music-card" key={card.title}>
                <img src={card.imgSrc} alt={card.title} />
                <div className="music-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                </div>
            </article>
        ))}
    </div>
);

export default CardsGroup;
