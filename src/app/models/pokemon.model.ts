export interface Pokemon {
message: any;
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  types: Type[];
  stats: Stat[];
  sprites: Sprites;
  isFavorite: boolean; 
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  frontDefault: string;
  frontShiny: string;
  backDefault: string;
  backShiny: string;
}

