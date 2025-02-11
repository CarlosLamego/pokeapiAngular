import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {
  private _allPokemons: Pokemon[] = []

  constructor(private _pokemonService: PokemonService) { }

  async searchPokemons(term: string): Promise<Pokemon[]> {
    if (this._allPokemons.length === 0 ) {
      this._allPokemons = await this._pokemonService.getPokemons();
    }

    if (!term) {
      return this._allPokemons
    }

    const searchTerm = term.toLocaleLowerCase();
    return this._allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm))
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    if (this._allPokemons.length === 0 ) {
      this._allPokemons = await this._pokemonService.getPokemons();
    }

    return this._allPokemons;
  }
}
