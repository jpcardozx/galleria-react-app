export interface Artwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  objectDate?: string;  // Adicionado objectDate como opcional
}