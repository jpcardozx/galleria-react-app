import { Artwork } from '../types';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface MetApiResponse {
  total: number;
  objectIDs: number[];
}

interface MetArtworkDetails {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  objectDate?: string;
  // Adicione outros campos conforme necessário
}

const artworkCache: Map<number, Artwork> = new Map();

export const fetchArtworks = async (limit: number = 15): Promise<Artwork[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?hasImages=true&isHighlight=true&q=paintings`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data: MetApiResponse = await response.json();
    const objectIDs = data.objectIDs.slice(0, limit);

    const artworks = await Promise.all(objectIDs.map(id => fetchArtwork(id)));
    return artworks;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return [];
  }
};

export const fetchArtwork = async (id: number): Promise<Artwork> => {
  if (artworkCache.has(id)) {
    return artworkCache.get(id)!;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/objects/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching artwork with ID ${id}: ${response.status} - ${response.statusText}`);
    }
    const details: MetArtworkDetails = await response.json();
    
    const artwork: Artwork = {
      objectID: details.objectID,
      title: details.title,
      artistDisplayName: details.artistDisplayName,
      primaryImageSmall: details.primaryImage,
      objectDate: details.objectDate,
    };

    artworkCache.set(id, artwork);
    return artwork;
  } catch (error) {
    console.error(`Error fetching artwork ${id}:`, error);
    throw error;
  }
};