import { Component, input, output } from '@angular/core';
import { MovieService } from '../../../../../core/services/movie-service';
import { MovieProductCounties } from '../../../models/movie.models';
import { Button } from '../../../../../shared/components/button/button';
import { MetaInfo } from '../../../../../shared/components/meta-info/meta-info';

@Component({
  selector: 'app-movie-hero',
  standalone: true,
  imports: [Button, MetaInfo],
  templateUrl: './movie-hero.html',
  styleUrl: './movie-hero.scss',
})
export class MovieHero {
  background = input<string>('/assets/images/bg.png');
  title = input<string>('заголовок');
  adult = input<boolean>(false);
  rating = input<number>(0);
  date = input<string>();
  countries = input<MovieProductCounties>();
  runtime = input<number>();
  genres = input<string[]>();
  isFavorite = input<boolean>(false);
  watchVideo = output();
  favorites = output();
  watchedVideo() {
    this.watchVideo.emit();
  }
  toggleFavorite() {
    this.favorites.emit();
  }
}
