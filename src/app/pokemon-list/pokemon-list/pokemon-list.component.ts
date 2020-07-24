import { PokemonFavoriteSalvarService } from './../../services/pokemon/pokemon-favorite-salvar.service';
import { Observable } from 'rxjs';
import { Pokemon } from './../../entities/pokemon/pokemon';
import { PokemonGetAllService } from './../../services/pokemon/pokemon-get-all.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: any[];
  constructor(
    private pokemonGetAllService: PokemonGetAllService,
    private pokemonFavoriteService: PokemonFavoriteSalvarService
  ) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonGetAllService.get().subscribe(res => {
      this.pokemonList = res;
      this.setFavorites(this.pokemonList);
    });
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
}
