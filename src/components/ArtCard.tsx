import React from 'react';
import { Artwork } from '../types';
import '../styles/ArtCard.css';

interface ArtCardProps {
  artwork: Artwork;
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => (
  <div className="art-card">
    <img 
      src={artwork.primaryImageSmall} 
      alt={`Artwork: ${artwork.title} by ${artwork.artistDisplayName}`} 
      className="art-image" 
    />
    <div className="art-overlay">
      <h2 className="art-title">{artwork.title}</h2>
      <p className="art-artist">{artwork.artistDisplayName}</p>
      {artwork.objectDate && <p className="art-date">{artwork.objectDate}</p>}
    </div>
  </div>
);

export default ArtCard;