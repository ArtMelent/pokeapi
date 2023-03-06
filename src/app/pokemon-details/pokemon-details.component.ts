import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon!: Pokemon;
  pokemonId: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonId = params.get('id') || '';
      this.getPokemonDetails(this.pokemonId);
    });
  }
  getAbilities(): string {
    if (this.pokemon && this.pokemon.abilities) {
      return this.pokemon.abilities.map(x => x.ability.name).join(', ');
    }
    return '';
  }
  

  getPokemonDetails(id: string): void {
    this.pokemonService.getPokemonDetails(id).subscribe(
      pokemon => {
        this.pokemon = pokemon;
      },
      error => {
        console.log('Error fetching pokemon details', error);
      }
    );
  }
}
