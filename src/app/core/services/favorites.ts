import { Injectable } from '@angular/core';
import { Movie } from '../../features/movie/models/movie.models';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  getAll(): number[] {
    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  }
  addFavorite(id: number) {
    const currentFavorites = this.getAll();
    currentFavorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
  }
  removeFavorite(id: number) {
    const currentFavorites = this.getAll();
    const update = currentFavorites.filter((f) => f !== id);
    localStorage.setItem('favorites', JSON.stringify(update));
  }

  isFavorite(id: number) {
    const currentFavorites = this.getAll();
    return  currentFavorites.includes(id);
  }
}
