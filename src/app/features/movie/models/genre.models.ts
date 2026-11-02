import { MovieWithGenre } from './movie.models';

export interface GenreResponse {
  genres: Genre[];
}

export enum MovieGenreId {
  Comedy = 35,
  Drama = 18,
  Fantasy = 14,
  Thriller = 53,
  Mystery = 9648,
}

export type Genre = { id: number; name: string };

export interface GenreWithMovies {
  genre: Genre;
  movies: MovieWithGenre[];
}
