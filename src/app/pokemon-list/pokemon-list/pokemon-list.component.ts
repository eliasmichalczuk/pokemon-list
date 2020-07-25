import { Observable, forkJoin } from 'rxjs';
import { PokemonGetByIdService } from './../../services/pokemon/pokemon-get-by-id.service';
import { Component, OnInit } from '@angular/core';

import { PokemonFavoriteSalvarService } from './../../services/pokemon/pokemon-favorite-salvar.service';
import { PokemonGetAllService } from './../../services/pokemon/pokemon-get-all.service';
import { Pokemon } from 'src/app/entities/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemonViewed: Pokemon = null;
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
      this.assignValues(res);
    });
  }

  assignValues(pokemon: Pokemon[]): void {
    this.pokemonList = pokemon;
  }

  next(): void {
    this.pokemonGetAllService.next().subscribe(res => this.assignValues(res));
  }

  previous(): void {
    this.pokemonGetAllService.previous().subscribe(res => this.assignValues(res));
  }

  reset(): void {
    this.onlyFavoritesShowing = false;
    this.pokemonGetAllService.reset().subscribe(res => this.assignValues(res));
  }

  favorite(pokemon: Pokemon, index: number): void {
    if (pokemon.isFavorite) {
      this.pokemonFavoriteService.remove(pokemon.id);
    } else {
      this.pokemonFavoriteService.include(pokemon.id);
    }
    pokemon.isFavorite = !pokemon.isFavorite;
    this.removeFromViewedList(pokemon, index);
  }

  removeFromViewedList(pokemon: Pokemon, index: number): void {
    if (this.onlyFavoritesShowing && !pokemon.isFavorite) {
      this.pokemonList.splice(index, 1);
    }
  }

  mouseEnter(pokemon: Pokemon): void {
    this.pokemonViewed = pokemon;
  }

  onlyFavorites(): void {
    this.onlyFavoritesShowing = true;
    const favoritesList = this.pokemonFavoriteService.getAll();
    const pokemonListOnlyFavorites = [];
    if (favoritesList && favoritesList.length) {
      favoritesList.forEach(id => pokemonListOnlyFavorites.push(this.pokemonGetByIdService.get(id)));
    }
    this.loadFavorites(pokemonListOnlyFavorites);
  }

  loadFavorites(list: Observable<any>[]): void {
    forkJoin(list).subscribe(values => this.assignValues(values));
  }
}
