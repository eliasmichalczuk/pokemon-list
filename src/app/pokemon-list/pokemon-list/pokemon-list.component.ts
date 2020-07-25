import { Observable, forkJoin } from 'rxjs';
import { PokemonGetByIdService } from './../../services/pokemon/pokemon-get-by-id.service';
import { Component, OnInit } from '@angular/core';

import { PokemonFavoriteSalvarService } from './../../services/pokemon/pokemon-favorite-salvar.service';
import { PokemonGetAllService } from './../../services/pokemon/pokemon-get-all.service';
import { IPokemon } from 'src/app/entities/pokemon/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: IPokemon[];
  pokemonViewed: IPokemon = null;
  onlyFavoritesShowing: boolean;

  get showPrevious(): boolean {
    return !this.pokemonGetAllService.hasPrevious || this.onlyFavoritesShowing;
  }

  get showNext(): boolean {
    return !this.pokemonGetAllService.hasNext || this.onlyFavoritesShowing;
  }

  constructor(
    public pokemonGetAllService: PokemonGetAllService,
    private pokemonFavoriteService: PokemonFavoriteSalvarService,
    private pokemonGetByIdService: PokemonGetByIdService
  ) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonGetAllService.get().subscribe(res => {
      this.map(res);
    });
  }

  map(pokemon: any[]): void {
    this.pokemonList = pokemon;
    this.setFavorites(this.pokemonList);
  }

  favorite(pokemon: any): void {
    if (pokemon.isFavorite) {
      this.pokemonFavoriteService.remove(pokemon.id);
    } else {
      this.pokemonFavoriteService.set(pokemon.id);
    }
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  setFavorites(list: any[]): void {
    const favoritesList = this.pokemonFavoriteService.get();
    if (favoritesList && favoritesList.length) {
      list.forEach(pokemon => {
        if (this.isOnTheList(favoritesList, pokemon.id)) {
          pokemon.isFavorite = true;
        } else {
          pokemon.isFavorite = false;
        }
      });
    } else {
      list.forEach(pokemon => {
        pokemon.isFavorite = false;
      });
    }
  }

  isOnTheList(list: number[], id: number): boolean {
    return list.indexOf(id) > -1;
  }

  next(): void {
    this.pokemonGetAllService.next().subscribe(res => this.map(res));
  }

  previous(): void {
    this.pokemonGetAllService.previous().subscribe(res => this.map(res));
  }

  mouseEnter(pokemon: any): void {
    this.pokemonViewed = pokemon;
  }

  onlyFavorites(): void {
    this.onlyFavoritesShowing = true;
    const favoritesList = this.pokemonFavoriteService.get();
    const pokemonListOnlyFavorites = [];
    if (favoritesList && favoritesList.length) {
      favoritesList.forEach(id => pokemonListOnlyFavorites.push(this.pokemonGetByIdService.get(id)));
    }
    this.loadFavorites(pokemonListOnlyFavorites);
  }

  loadFavorites(list: Observable<any>[]): void {
    forkJoin(list).subscribe(values => this.map(values));
  }

  reset(): void {
    this.onlyFavoritesShowing = false;
    this.pokemonGetAllService.reset().subscribe(res => this.map(res));
  }
}
