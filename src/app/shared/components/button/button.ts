import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  text = input<string>('Подробнее');
  class = input<string>('btn');
  variant = input<'primary' | 'secondary' | 'icon'>('primary');
  icon = input<string>('icon');
  favorite = input<boolean>(false);
}
