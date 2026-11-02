import { Component, inject, input, signal } from '@angular/core';
import { AsyncPipe, NgClass, SlicePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavItem } from '../../interface/nav-interface';
import { filter } from 'rxjs';
import { Logo } from '../../../shared/components/logo/logo';
import { Search } from './components/search/search';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, Logo, Search, AsyncPipe, SlicePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  variant = signal<'default' | 'inner'>('default');
  buttonPanel = [
    {
      iconId: 'search',
      ariaLabel: 'Поиск',
      route: '/search',
      text: 'Поиск',
      variant: 'primary',
      event: 'click',
    },
    {
      iconId: 'bell',
      ariaLabel: 'Оповещения',
      route: '/notification',
      variant: 'icon',
    },
    {
      iconId: 'profile',
      ariaLabel: 'Профиль',
      route: '/profile',
      className: 'btn-profile',
      variant: 'icon',
    },
  ];

  readonly navHeader: NavItem[] = [
    { title: 'Фильмы', route: '/movies' },
    { title: 'Сериалы', route: '/series' },
    { title: 'Подборки', route: '/collections' },
  ];
  private router = inject(Router);
  movieService = inject(MovieService);
  isSearchOpen = signal<boolean>(false);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;
      const childRoute = currentRoute.firstChild;
      this.variant.set(childRoute?.data['headerVariant'] ?? 'default');
    });
  }

  toggleSearch() {
    this.isSearchOpen.set(!this.isSearchOpen());
    console.log(this.isSearchOpen);
  }

  closeSearch() {
    this.isSearchOpen.set(false);
  }

  onButtonClick(event: string) {
    if (event === 'search') {
      this.toggleSearch();
    }
  }
}
