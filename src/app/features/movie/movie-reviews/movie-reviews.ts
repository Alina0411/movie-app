import { Component, inject, input, OnInit } from '@angular/core';
import { MovieService } from '../../../core/services/movie-service';
import { Observable, tap } from 'rxjs';
import { Review } from '../models/reviews.models';
import { AsyncPipe } from '@angular/common';
import { ReviewCard } from './components/review-card/review-card';

@Component({
  selector: 'app-movie-reviews',
  imports: [AsyncPipe, ReviewCard],
  templateUrl: './movie-reviews.html',
  styleUrl: './movie-reviews.scss',
})
export class MovieReviews implements OnInit {
  id = input<number>(0);
  movieService = inject(MovieService);
  reviewsS!: Observable<Review[]>;
  ngOnInit() {
    this.reviewsS = this.movieService.getReviewsMovies(this.id()).pipe(
      tap(reviews => console.log(reviews)),
    );
  }
}
