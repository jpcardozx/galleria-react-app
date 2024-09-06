import React, { useEffect, useState } from 'react';
import { fetchArtworks } from '../services/metApi';
import { Artwork } from '../types';
import '../styles/Gallery.css';
import ArtCard from './ArtCard';

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchArtworks(15);  // Fetch 15 artworks
        setArtworks(data);
      } catch (err) {
        setError('Error loading artworks. Please try again later.');
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  if (loading) {
    return <div className="spinner">Loading artworks...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gallery-container">
      {artworks.length === 0 ? (
        <p>No artworks found. Please try refreshing the page.</p>
      ) : (
        artworks.map((artwork) => (
          <ArtCard key={artwork.objectID} artwork={artwork} />
        ))
      )}
    </div>
  );
};

export default Gallery;