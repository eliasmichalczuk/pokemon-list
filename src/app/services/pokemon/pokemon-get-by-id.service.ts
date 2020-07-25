import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { IPokemonAPIRequest } from 'src/app/entities/pokemon-api/pokemon-api-request.interface';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class PokemonGetByIdService {

  private _url = 'https://pokeapi.co/api/v2/pokemon/{0}';
  get url(): string {
    return this._url;
  }

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<IPokemon> {
    return this.http.get<IPokemon>(this.url.replace('{0}', id.toString()));
  }
}
