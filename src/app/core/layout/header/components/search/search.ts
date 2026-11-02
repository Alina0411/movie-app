import { Component, inject, output } from '@angular/core';
import { Logo } from '../../../../../shared/components/logo/logo';
import { Button } from '../../../../../shared/components/button/button';
import { Movie } from '../../../../../features/movie/models/movie.models';
import { MovieService } from '../../../../services/movie-service';
import { PopularPerson } from '../../../../../features/movie/models/person.models';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { debounceTime, filter, Observable, Subject, switchMap } from 'rxjs';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { DepartmentRuPipe } from '../../../../../shared/pipes/department-ru-pipe';

@Component({
  selector: 'app-search',
  imports: [Logo, Button, AsyncPipe, SlicePipe, RouterLink, DepartmentRuPipe],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  closeSearch = output();
  router = inject(Router);
  movieService = inject(MovieService);
  popularMovies$: Observable<Movie[]> = this.movieService.getPopularMovies();
  popularPerson$: Observable<PopularPerson[]> = this.movieService.getPopularPersons();
  searchSubject = new Subject<string>();
  searchResults$: Observable<Movie[]> = this.searchSubject.pipe(
    debounceTime(300),
    switchMap((subject): Observable<Movie[]> => {
      return this.movieService.searchMulti(subject);
    }),
  );

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.closeSearch.emit();
      });
  }
}
