import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/entities/pokemon/pokemon';

import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { PokemonFavoriteSalvarService } from './pokemon-favorite-salvar.service';
import { PokemonGetAllServiceMapper } from './pokemon-get-all-service.mapper';

@Injectable()
export class PokemonGetByIdService {

  private _mapper: PokemonGetAllServiceMapper = null;
  private _url = 'https://pokeapi.co/api/v2/pokemon/{0}';
  get url(): string {
    return this._url;
  }

  constructor(
    private http: HttpClient,
    pokemonFavoriteService: PokemonFavoriteSalvarService,
  ) {
    this._mapper = new PokemonGetAllServiceMapper(pokemonFavoriteService);
  }

  get(id: number): Observable<Pokemon> {
    return this.http.get<IPokemon>(this.url.replace('{0}', id.toString())).pipe(map(intrface => this._mapper.from(intrface)));
  }
}
