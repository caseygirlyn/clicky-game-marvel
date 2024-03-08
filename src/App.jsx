import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'
import './App.css'

const App = () => {
  const images = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
    '/images/7.png',
    '/images/8.png',
    '/images/9.png',
    '/images/10.png',
    '/images/11.png',
    '/images/12.png',
  ];

  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(
    localStorage.getItem('topScore') ? parseInt(localStorage.getItem('topScore')) : 0
  );
  const [clickedImages, setClickedImages] = useState([]);
  const [shuffledImages, setShuffledImages] = useState(images);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    localStorage.setItem('topScore', topScore);
  }, [topScore]);

  const handleClick = (image) => {
    if (clickedImages.includes(image)) {
      setScore(0);
      setClickedImages([]);
      setAlertText('Game over!');
      shuffleImages();
    } else {
      setScore(score + 1);
      setClickedImages([...clickedImages, image]);
      setAlertText('Keep going!');
      shuffleImages();
    }
  };

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  };

  const handleGameEnd = () => {
    if (score > topScore) {
      setTopScore(score);
    }
  };


  return (
    <>
      <div>
        <nav className="navbar">
          <ul className='m-0 p-0 w-100'>
            <li className="brand"><a href="/">Clicky Game</a></li>
            <li className=""><div className="alert mb-0 d-contents">{alertText}</div></li>
            <li>Score: {score} | Top Score: {topScore}</li>
          </ul>
        </nav>
        <header className="header"><h1>Clicky Game!</h1><h2>Click on an image to earn points, but don't click on any more than once!</h2></header>
        <div className="images">
          {shuffledImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              onClick={() => handleClick(image)}
            />
          ))}
        </div>
        <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
          <div className="d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
            </a>
            <span className="text-muted">© 2024 Girlyn Casey</span>
          </div>
        </footer>
      </div>

    </>
  )
}

export default App
