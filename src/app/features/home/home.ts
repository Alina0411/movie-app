import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Hero } from './components/hero/hero';
import { MovieService } from '../../core/services/movie-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Advantages } from './components/advantages/advantages';
import { map, Observable, pipe, switchMap, tap } from 'rxjs';
import { MovieCatalog } from '../movie/movie-catalog/movie-catalog';
import { Button } from '../../shared/components/button/button';
import { Movie } from '../movie/models/movie.models';
import { GenreWithMovies, MovieGenreId } from '../movie/models/genre.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, AsyncPipe, Advantages, MovieCatalog, Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home {
  movieService = inject(MovieService);
  popularMovies$: Observable<Movie[]> = this.movieService.withGenres(this.movieService.getPopularMovies())
  movieWithGenre$: Observable<GenreWithMovies[]> = this.movieService.getMoviesByGenres();
  readonly homeGenres$ = this.movieService.getMoviesByGenres().pipe(
    map((genres) =>
      genres.filter(({ genre }) =>
        Object.values(MovieGenreId)
          .filter((value) => typeof value === 'number')
          .includes(genre.id),
      ),
    ),
  );
}
