import { Pokemon } from './../../entities/pokemon/pokemon';
import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { PokemonFavoriteSalvarService } from './pokemon-favorite-salvar.service';

export class PokemonGetAllServiceMapper {

  constructor(
    private pokemonFavoriteService: PokemonFavoriteSalvarService
  ) { }

  map(list: IPokemon[]): Pokemon[] {
    const favoritesList = this.pokemonFavoriteService.getAll();
    const mapped = [];
    list.forEach(toMap => mapped.push(this.fromWithList(toMap, favoritesList)));
    return mapped;
  }

  from(i: IPokemon): Pokemon {
    const favoritesList = this.pokemonFavoriteService.getAll();
    return new Pokemon(
      i.id,
      i.name,
      i.base_experience,
      i.height,
      i.is_default,
      i.order,
      i.weight,
      i.stats,
      i.sprites,
      i.moves,
      this.isOnTheList(favoritesList, i.id));
  }

  private fromWithList(i: IPokemon, favoritesList: number[]): Pokemon {
    return new Pokemon(
      i.id,
      i.name,
      i.base_experience,
      i.height,
      i.is_default,
      i.order,
      i.weight,
      i.stats,
      i.sprites,
      i.moves,
      this.isOnTheList(favoritesList, i.id));
  }

  private isOnTheList(list: number[], id: number): boolean {
    if (!list || !list.length) {
      return false;
    }
    return list.indexOf(id) > -1;
  }
}
