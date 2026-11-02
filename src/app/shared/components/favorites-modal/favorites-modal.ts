import { Component, inject, OnInit, output, signal } from '@angular/core';
import { MovieService } from '../../../core/services/movie-service';
import { Favorites } from '../../../core/services/favorites';
import { forkJoin } from 'rxjs';
import { MovieDetailsResponse } from '../../../features/movie/models/movie.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-modal',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './favorites-modal.html',
  styleUrl: './favorites-modal.scss',
})
export class FavoritesModal implements OnInit {
  movieService = inject(MovieService);
  favoriteService = inject(Favorites);
  moviesFavorite = signal<MovieDetailsResponse[]>([]);
  close = output();

  ngOnInit() {
    const moviesFavoriteId = this.favoriteService.getAll();
    const requests = moviesFavoriteId.map((id) => this.movieService.getMovieDetailsById(id));
    forkJoin(requests).subscribe((movies) => this.moviesFavorite.set(movies));
  }
}
