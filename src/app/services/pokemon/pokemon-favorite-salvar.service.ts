import { Injectable } from '@angular/core';

@Injectable()
export class PokemonFavoriteSalvarService {

  private readonly _key = 'favoritePokemon';

  constructor(
  ) { }

  include(id: number): void {
    const list = this.getFromStorage();
    list.push(id);
    localStorage.setItem(this._key,  JSON.stringify(list));
  }

  getAll(): number[] {
    if (localStorage.hasOwnProperty(this._key)) {
      return this.getFromStorage();
    } else {
      this.setStorage();
      return [];
    }
  }

  remove(id: number): void {
    const list = this.getFromStorage();
    const index = list.findIndex(poke => poke === id);
    if (this.isOnTheList(index)) {
      list.splice(index, 1);
      localStorage.setItem(this._key,  JSON.stringify(list));
    }
  }

  private isOnTheList(index: number): boolean {
    return index > -1;
  }

  private setStorage(): void {
    localStorage.setItem(this._key,  JSON.stringify([]));
  }

  private getFromStorage(): number[] {
    return JSON.parse(localStorage.getItem(this._key));
  }
}
