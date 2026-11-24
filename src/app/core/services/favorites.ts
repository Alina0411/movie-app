import { Injectable } from '@angular/core';
import { FAVORITES_KEY } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  getAll(): number[] {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]');
  }
  addFavorite(id: number) {
    const currentFavorites = this.getAll();
    currentFavorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(currentFavorites));
  }
  removeFavorite(id: number) {
    const currentFavorites = this.getAll();
    const update = currentFavorites.filter((f) => f !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(update));
  }

  isFavorite(id: number) {
    const currentFavorites = this.getAll();
    return currentFavorites.includes(id);
  }
}
