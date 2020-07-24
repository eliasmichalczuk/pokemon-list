import { IPokemon } from './pokemon.interface';

export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public baseExperience: number,
    public height: number,
    public isDefault: boolean,
    public order: number,
    public weight: number
  ) {
  }

  static from(i: IPokemon): Pokemon {
    return new Pokemon(i.id, i.name, i.base_experience, i.height, i.is_default, i.order, i.weight);
  }
}
