import { Component, inject, input } from '@angular/core';
import { Review } from '../../../models/reviews.models';
import { DatePipe } from '@angular/common';
import { MovieService } from '../../../../../core/services/movie-service';

@Component({
  selector: 'app-review-card',
  imports: [DatePipe],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  movieService = inject(MovieService);
  review = input<Review>();

  getAvatarUrl(url: string) {
    return this.movieService.getImageUrl(url);
  }
}
