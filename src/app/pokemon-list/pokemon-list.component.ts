import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { forkJoin } from 'rxjs';

interface Pokemon{
  id: number;
  name: string;
  isFavorite: boolean;
}
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  favoritePokemonList: any[] = [];
  total!: number;
  page = 1;
  pageSize = 12;

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.loadPokemonList();
    this.loadFavorites();
    for (let i = 1; i <= 12; i++) {
      this.favoritesService.getPokemon(i).subscribe((pokemon: any) => {
        return this.pokemons.push({ id: pokemon.id, name: pokemon.name, isFavorite: pokemon.isFavorite });
      });
    }
    
  }

  loadPokemonList(): void {
    this.pokemonService.getPokemonList(this.pageSize, (this.page - 1) * this.pageSize)
      .subscribe((response: any) => {
        this.total = response.count;
        const pokemonDetailsObservables = response.results.map((result: { name: string }) => {
          return this.pokemonService.getPokemonDetails(result.name);
        });
        forkJoin(pokemonDetailsObservables).subscribe((pokemonDetails: any) => {
          this.pokemons = pokemonDetails;
          this.loadFavorites();
        });
      });
  }

  loadFavorites(): void {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.pokemons.forEach(pokemon => {
      const pokemonInFavorites = favorites.find(fav => fav.id === pokemon.id);
      pokemon.isFavorite = pokemonInFavorites ? true : false;
    });
  }
  
  addFavorite(id: number) {
    // Show confirmation dialog
    const dialogRef = this.dialog.open(FavoriteDialogComponent, {
      width: '350px',
      data: { message: 'Do you really want to add the Pokemon to favorites?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.favoritesService.addFavoritePokemon(id);
        const pokemon = this.pokemons.find(pokemon => pokemon.id === id);
        if (pokemon) {
          // Update the Pokemon's isFavorite property to true
          pokemon.isFavorite = true;

          const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');

          favorites.push({ id: pokemon.id, name: pokemon.name });

          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
      }
    });
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
