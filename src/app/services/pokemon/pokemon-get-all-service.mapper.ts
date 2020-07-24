import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { Pokemon } from './../../entities/pokemon/pokemon';
export class PokemonGetAllServiceMapper {
  from(i: IPokemon): Pokemon {
    return Pokemon.from(i);
  }
}
