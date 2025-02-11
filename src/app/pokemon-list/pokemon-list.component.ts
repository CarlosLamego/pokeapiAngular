import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Observable } from 'rxjs';
import { PokemonSearchService } from '../services/pokemon-search.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  imports: [PokemonCardComponent, SlicePipe]
})
export class PokemonListComponent implements OnInit {
  // pokemons$!: Observable<Pokemon[]>;
  pokemons: Pokemon[] = []; // Lista de Pokémons
  isLoading: boolean = true; // Estado de carregamento
  selectedPokemon: Pokemon | null = null;
  pokemonDefault: Pokemon | null = null;

  currentPage: number = 0;
  itemsPerPage: number = 12;

  nextPage(): void {
    if((this.currentPage + 1) * this.itemsPerPage < this.pokemons.length ) {
      this.currentPage++
    }
  }

  previousPage(): void {
    if (this.currentPage > 0 ) {
      this.currentPage--
    }
  }

  constructor(private _pokemonSearchService: PokemonSearchService) {}

  async ngOnInit(): Promise<void> {
    await this.loadPokemons();
  }

  async loadPokemons() : Promise<void> {
    this.isLoading = true ;
    try {
      this.pokemons = await this._pokemonSearchService.getAllPokemons();
      this.setDefaultPokemon()
    } catch (error) {
      console.error('Erro ao carregar Pokémons:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async search(event: any): Promise<void> {
    const term = event.target.value;
    this.pokemons = await this._pokemonSearchService.searchPokemons(term);
    this.setDefaultPokemon();
  }

  setDefaultPokemon(): void {
    if (this.pokemons.length > 0) {
      this.pokemonDefault = this.pokemons[0]; // Define o primeiro Pokémon da lista
    } else {
      this.pokemonDefault = null; // Se a lista estiver vazia, define como null
    }
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

}
