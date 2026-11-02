import { Component, input } from '@angular/core';
import { DurationPipe } from '../../pipes/duration-pipe';

export interface InfoItem {
  label: string;
  value: string | number | string[];
}
@Component({
  selector: 'app-info-list',
  imports: [DurationPipe],
  templateUrl: './info-list.html',
  styleUrl: './info-list.scss',
})
export class InfoList {
  items = input.required<InfoItem[]>();
  protected readonly Array = Array;
}
