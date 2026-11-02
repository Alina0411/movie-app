import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DurationPipe } from '../../pipes/duration-pipe';

@Component({
  selector: 'app-meta-info',
  imports: [DecimalPipe, DurationPipe],
  templateUrl: './meta-info.html',
  styleUrl: './meta-info.scss',
})
export class MetaInfo {
  readonly variant = input<'card' | 'hero'>('card');
  readonly rating = input<number>();
  readonly year = input<string | number>();
  readonly country = input<string>();
  readonly type = input<string>();
  readonly genres = input<string[]>();
  readonly runtime = input<number>();
  readonly genreText = input<string[]>();
}
