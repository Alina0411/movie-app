import { Component  } from '@angular/core';
import { Header } from '../header/header';
import {  RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-site-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './site-layout.html',
  styleUrl: './site-layout.scss',
})
export class SiteLayout {

}
