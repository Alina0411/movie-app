import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';
import { SiteLayout } from './core/layout/site-layout/site-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SiteLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('movie-app-template');
}
