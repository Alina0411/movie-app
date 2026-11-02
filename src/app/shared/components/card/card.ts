import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaInfo } from '../meta-info/meta-info';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, MetaInfo, SlicePipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  id = input.required<number>();
  title = input<string>('title');
  poster = input<string>('assets/images/no-poster.png');
  description = input<string>('description');
  rating = input<number>(0);
  type = input<string>('Фильм');
  genre = input<string[]>([]);
}
