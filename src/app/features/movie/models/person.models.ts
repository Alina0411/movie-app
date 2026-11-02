import { Movie } from './movie.models';

export interface PopularPersonResponse {
  page: number;
  results: PopularPerson[];
  total_pages: number;
  total_results: number;
}

export interface PopularPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Movie[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}
