import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.scss']
})
export class FavoritePokemonComponent implements OnInit {
  favoritePokemonList: any[] = [];
  pokemons: Pokemon[] = [];

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
  ) {
    console.log(this.favoritesService.getFavoritePokemon());
  }

  ngOnInit(): void {
    const favoriteIds = this.favoritesService.getFavoritePokemon();
    for (const id of favoriteIds) {
      this.favoritesService.getPokemon(id).subscribe((pokemon: any) => {
        this.favoritePokemonList.push(pokemon);
      });
    }
  }


  goToPokemonDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  removeFavorite(id: number) {
    this.favoritesService.removeFavoritePokemon(id);
    this.favoritePokemonList = this.favoritePokemonList.filter(pokemon => pokemon.id !== id);
    // Find the Pokemon in the list with the given ID
    const pokemon = this.pokemons.find(pokemon => pokemon.id === id);
    if (pokemon) {
      // Update the Pokemon's isFavorite property to false
      pokemon.isFavorite = false;
    }

    // Update localStorage to remove the Pokemon from favorites
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex(fav => fav.id === id);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
}
