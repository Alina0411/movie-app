import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Slider } from '../../../shared/components/slider/slider';
import { Card } from '../../../shared/components/card/card';
import { Button } from '../../../shared/components/button/button';
import { GenreWithMovies } from '../models/genre.models';

@Component({
  selector: 'app-movie-catalog',
  imports: [Slider, Card, Button],
  templateUrl: './movie-catalog.html',
  styleUrl: './movie-catalog.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieCatalog {
  movieWithGenre = input<GenreWithMovies[]>([]);
}
