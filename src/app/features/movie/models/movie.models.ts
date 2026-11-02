import { Genre } from './genre.models';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  softcore: boolean;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieWithGenre extends Movie {
  genresMovie: string[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: MovieCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string[] | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieProductCompanies[];
  production_countries: MovieProductCounties;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieProductCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieProductCounties {
  iso_3166_1: string;
  name: string;
}

export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface MovieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CreditPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastMember extends CreditPerson {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember extends CreditPerson {
  department: string;
  job: string;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MovieVideoResponse {
  id: number;
  results: MovieVideo[];
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
