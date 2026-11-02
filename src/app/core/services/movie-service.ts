import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import {
  Movie,
  MovieCreditsResponse,
  MovieDetailsResponse,
  MovieResponse,
  MovieVideo,
  MovieVideoResponse,
  MovieWithGenre,
} from '../../features/movie/models/movie.models';
import { Genre, GenreResponse, GenreWithMovies } from '../../features/movie/models/genre.models';
import { Review, ReviewResponse } from '../../features/movie/models/reviews.models';
import { PopularPerson, PopularPersonResponse } from '../../features/movie/models/person.models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  private readonly apiUrl = 'https://api.themoviedb.org/3/';
  private token = environment.tmdbToken;
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p';
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    Accept: 'application/json',
  });
  readonly genres$ = this.http
    .get<GenreResponse>(`${this.apiUrl}genre/movie/list`, {
      headers: this.headers,
      params: {
        language: 'ru-RU',
      },
    })
    .pipe(
      map((response) => response.genres),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  getPopularMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.apiUrl}movie/popular`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(
        map((response) => response.results),
        catchError(() => of([] as Movie[])),
      );
  }

  getGenresMovies(): Observable<Genre[]> {
    return this.http
      .get<GenreResponse>(`${this.apiUrl}/genre/movie/list`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(
        map((response) => response.genres),
        catchError(() => of([] as Genre[])),
      );
  }

  private addGenreNames(movies: Movie[], genres: Genre[]): MovieWithGenre[] {
    return movies.map((movie) => ({
      ...movie,
      genresMovie: genres
        .filter((genre) => movie.genre_ids.includes(genre.id))
        .map((genre) => genre.name),
    }));
  }

  getDiscoverMovie(id: number) {
    return this.http
      .get<MovieResponse>(`${this.apiUrl}/discover/movie`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
          with_genres: id,
        },
      })
      .pipe(
        map((response) => response.results),
        catchError(() => of([] as Movie[])),
      );
  }

  getMoviesByGenres(): Observable<GenreWithMovies[]> {
    return this.getGenresMovies().pipe(
      switchMap((genres) => {
        return forkJoin(
          genres.map((genre) => {
            return this.getDiscoverMovie(genre.id).pipe(
              map((movies) => {
                const moviesWithGenre = movies.map((movie): MovieWithGenre => {
                  return {
                    ...movie,
                    genresMovie: genres
                      .filter((g) => movie.genre_ids.includes(g.id))
                      .map((g) => g.name),
                  };
                });
                return {
                  genre,
                  movies: moviesWithGenre,
                };
              }),
              catchError(() => {
                return of({ genre, movies: [] });
              }),
            );
          }),
        );
      }),
    );
  }

  getMovieDetailsById(id: number): Observable<MovieDetailsResponse> {
    return this.http
      .get<MovieDetailsResponse>(`${this.apiUrl}movie/${id}`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(catchError(() => of({} as MovieDetailsResponse)));
  }

  getMovieDetailsByIdCredit(id: number): Observable<MovieCreditsResponse> {
    return this.http
      .get<MovieCreditsResponse>(`${this.apiUrl}movie/${id}/credits`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(catchError(() => of({} as MovieCreditsResponse)));
  }

  getSimilarMovies(id: number): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.apiUrl}movie/${id}/similar`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(
        map((response) => response.results),
        catchError(()=> of([] as Movie[]))
      );
  }

  getReviewsMovies(id: number): Observable<Review[]> {
    return this.http
      .get<ReviewResponse>(`${this.apiUrl}movie/${id}/reviews`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => response.results),
        catchError(()=> of([] as Review[]))
      );
  }

  getVideoMovie(id: number): Observable<MovieVideo[]> {
    return this.http
      .get<MovieVideoResponse>(`${this.apiUrl}movie/${id}/videos`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => response.results),
        catchError(()=> of([] as MovieVideo[]))
      );
  }

  withGenres(movies$: Observable<Movie[]>): Observable<MovieWithGenre[]> {
    return movies$.pipe(
      switchMap((movies) => this.genres$.pipe(map((genres) => this.addGenreNames(movies, genres)))),
    );
  }

  getPopularPersons(): Observable<PopularPerson[]> {
    return this.http
      .get<PopularPersonResponse>(`${this.apiUrl}/person/popular`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
        },
      })
      .pipe(
        map((response) => response.results),
        catchError(()=> of([] as PopularPerson[]))
      );
  }

  getImageUrl(path: string | null): string {
    return path ? `${this.imageBaseUrl}${path}` : 'assets/images/no-poster.png';
  }

  searchMulti(query: string): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.apiUrl}/search/multi`, {
        headers: this.headers,
        params: {
          language: 'ru-RU',
          query,
        },
      })
      .pipe(
        map((response) => response.results),
        catchError(()=> of([] as Movie[]))
      );
  }
}
