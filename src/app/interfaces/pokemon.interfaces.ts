export interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string
    }
  }[];
}
