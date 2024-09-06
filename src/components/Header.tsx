import React, { useState } from 'react';
import '../styles/Header.css';

interface HeaderProps {
  onStartSlideshow: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartSlideshow }) => {
  const [isSlideshow, setIsSlideshow] = useState(false);

  const handleSlideshowClick = () => {
    setIsSlideshow(!isSlideshow);
    onStartSlideshow();
  };

  return (
    <header className="header">
      <h1 className="logo">galleria.</h1>
      <button className="slideshow-btn" onClick={handleSlideshowClick}>
        {isSlideshow ? 'Stop Slideshow' : 'Start Slideshow'}
      </button>
    </header>
  );
};

export default Header;