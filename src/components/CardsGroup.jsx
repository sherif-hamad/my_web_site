import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import studio from "../assets/studio1.png"; // Import the image
import playingKeys from "../assets/studio2.jpg"
import bigStudio from "../assets/studio3.jpg"


const cardData = [
    {
        title: "Writing Music",
        text: "I'm a music producer and composer with passion for Orchestra",
        imgSrc: `${studio}`,  // Replace with actual path
        buttonText: "Explore My Work",
    },
    {
        title: "Playing Keys",
        text: "I like to play many instruments, specially Keys & Violin",
        imgSrc: `${playingKeys}`,  // Replace with actual path
        buttonText: "Explore My Work",
    },
    {
        title: "In Studio",
        text: "I'm a Recording & Mix engineer, with handson on different tools & techniques",
        imgSrc: `${bigStudio}`,  // Replace with actual path
        buttonText: "Explore My Work",
    },
];


const CardsGroup = () => {
    return (
        <CardGroup>
            {cardData.map((card, index) => (
                <Card style={{ width: '18rem' }} className='me-3' key={index}>
                    <Card.Img
                        variant="top"
                        src={card.imgSrc}
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                        <Card.Title style={{ color: '#4545c0', fontWeight: 'bold' }}>{card.title}</Card.Title>
                        <Card.Text>{card.text}</Card.Text>
                        <Button variant="primary">{card.buttonText}</Button>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
    );
};

export default CardsGroup;
