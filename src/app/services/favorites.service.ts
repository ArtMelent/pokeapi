import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemon(id: number) {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  getFavoritePokemon(): number[] {
    const favorites = localStorage.getItem('favoritePokemon');
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavoritePokemon(id: number) {
    const favorites = this.getFavoritePokemon();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favoritePokemon', JSON.stringify(favorites));
    }
  }

  removeFavoritePokemon(id: number) {
    const favorites = this.getFavoritePokemon();
    const index = favorites.indexOf(id);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favoritePokemon', JSON.stringify(favorites));
    }
  }
}
