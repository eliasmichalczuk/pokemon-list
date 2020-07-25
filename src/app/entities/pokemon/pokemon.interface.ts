export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  url: string;
  stats: any[];
  sprites: any;
  moves: any[];
}
