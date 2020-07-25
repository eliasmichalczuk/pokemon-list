import { Injectable } from '@angular/core';

@Injectable()
export class PokemonFavoriteSalvarService {

  private readonly _key = 'favoritePokemon';

  constructor(
  ) { }

  set(id: number): void {
    if (localStorage.hasOwnProperty(this._key)) {
      const pokemon = JSON.parse(localStorage.getItem(this._key));
      pokemon.push({id});
      localStorage.setItem(this._key,  JSON.stringify(pokemon));
    } else {
      localStorage.setItem(this._key,  JSON.stringify([{id}]));
    }
  }

  remove(id: number): void {
    if (localStorage.hasOwnProperty(this._key)) {
      const list = JSON.parse(localStorage.getItem(this._key)) as [{id: number}];
      const index = list.findIndex(poke => poke.id === id);
      if (index > -1) {
        list.splice(index, 1);
      }
      localStorage.setItem(this._key,  JSON.stringify(list));
    }
  }

  get(): number[] {
    if (localStorage.hasOwnProperty(this._key)) {
      const pokemon = JSON.parse(localStorage.getItem(this._key)) as [{id: number}];
      const idList = [];
      pokemon.forEach(poke => idList.push(poke.id));
      return idList;
    }
  }
}
