import { Component, Input,  } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

}
