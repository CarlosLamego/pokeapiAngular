import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Pokemon, PokemonResponse } from '../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private _httpClient: HttpClient) {}

  async getPokemons(): Promise<Pokemon[]> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';    

    // 1. Requisição inicial para obter a lista de pokémons
    try {
      const response = await lastValueFrom(
        this._httpClient.get<PokemonResponse>(url)
      );

      // 2. Mapeamento e Requisição Individual para cada pokemon
      const pokemonDetails = await Promise.all(
        response.results.map(async (pokemon) => {
          // 2a. Requisição para detalhes de um pokemon
          const pokemonDetail = await lastValueFrom(
            this._httpClient.get<any>(pokemon.url)
          );
          const id = parseInt(pokemonDetail.id, 10);

          // 2b. Retorno de um objeto do tipo Pokemon
          return {
            id,
            name: pokemonDetail.name,
            sprites: pokemonDetail.sprites,
            types: pokemonDetail.types,
            moves: pokemonDetail.moves,
          } as Pokemon;
        })
      );

      // 3. Retorno do array com todos os pokemons
      return pokemonDetails;
    } catch (error) {
      console.log('Erro ao carregar pokemons: ', error);
      throw error;
    }
  }
}
