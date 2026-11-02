import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Slider } from '../../../../shared/components/slider/slider';
import { Movie } from '../../../movie/models/movie.models';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DatePipe, Slider],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Hero {
  movies = input<Movie[]>([]);

}
