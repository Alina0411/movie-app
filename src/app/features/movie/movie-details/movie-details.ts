import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../core/services/movie-service';
import { MovieHero } from './components/movie-hero/movie-hero';
import {
  CrewMember,
  Movie,
  MovieCreditsResponse,
  MovieDetailsResponse,
  MovieResponse,
} from '../models/movie.models';
import { InfoList } from '../../../shared/components/info-list/info-list';
import { Card } from '../../../shared/components/card/card';
import { Slider } from '../../../shared/components/slider/slider';
import { MovieReviews } from '../movie-reviews/movie-reviews';
import { Favorites } from '../../../core/services/favorites';

@Component({
  selector: 'app-movie-details',
  imports: [MovieHero, InfoList, Card, Slider, MovieReviews],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetails implements OnInit {
  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  favoriteService = inject(Favorites);
  isFavorite = signal(false);
  movie = signal<MovieDetailsResponse | null>(null);
  genresName = computed(() => this.movie()?.genres.map((genre) => genre.name) ?? []);
  credits = signal<MovieCreditsResponse | null>(null);
  director = computed(
    () =>
      this.credits()
        ?.crew.filter((crew) => crew.job === 'Director')
        .map((c) => c.name) ?? [],
  );
  cast = computed(() => this.credits()?.cast.map((cast) => cast.name) ?? []);
  similarMovies = signal<Movie[]>([]);

  ngOnInit() {
    const id: number = Number(this.route.snapshot.params['id']);
    this.isFavorite.set(this.favoriteService.isFavorite(id));
    console.log('isFavorite:', this.favoriteService.isFavorite(id));
    this.movieService.getMovieDetailsById(id).subscribe((m) => {
      console.log(m);
      this.movie.set(m);
    });

    console.log(typeof id, id);


    console.log(this.isFavorite())
    this.movieService.getMovieDetailsByIdCredit(id).subscribe((result) => this.credits.set(result));

    this.movieService.getSimilarMovies(id).subscribe((result) => {
      this.similarMovies.set(result);
    });
  }

  rows = computed(() => {
    const movie = this.movie();
    const director = this.director();
    const cast = this.cast();
    if (!movie) {
      return [];
    }
    const genres = movie.genres.map((genre) => genre.name) ?? [];
    return [
      // { label: 'Рейтинг IMDb', value: movie.imdb_id },
      { label: 'Рейтинг Кинопоиска', value: movie.vote_average },
      { label: 'Жанр', value: genres },
      { label: 'Режиссёр', value: director },
      { label: 'Актёрский состав', value: cast },
      { label: 'Страна', value: movie.origin_country },
      { label: 'Время', value: movie.runtime },
      { label: 'Аудиодорожки', value: movie.original_language },
      // { label: 'Субтитры', value: this.movie()?.title },
      // { label: 'Награды', value: this.user().city },
    ];
  });

  playVideo(id: number) {
    console.log(id);
    this.movieService.getVideoMovie(id).subscribe((result) => {
      console.log(result, 'result');
      const video = result.find((result) => result.site === 'YouTube');
      if (!video) {
        return;
      }
      window.open('https://www.youtube.com/watch?v=' + video.key);
    });
  }

  toggleFavorite(id: number) {
    if (this.isFavorite()) {
      this.favoriteService.removeFavorite(id)
    } else {
      this.favoriteService.addFavorite(id)
    }
    this.isFavorite.set(!this.isFavorite());
    console.log('ddd');
  }
}
