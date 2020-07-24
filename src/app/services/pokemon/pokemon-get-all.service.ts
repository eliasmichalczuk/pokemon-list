import { PokemonGetAllServiceMapper } from './pokemon-get-all-service.mapper';
import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/entities/pokemon/pokemon';

@Injectable()
export class PokemonGetAllService {

  private readonly _url = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly _details = 'https://pokeapi.co/api/v2/pokemon/{0}';
  // private _mapper = new PokemonGetAllServiceMapper();

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any[]> {
    return this.http.get<{count: number, previous: any, results: IPokemon[]}>(this._url).pipe(mergeMap(pokeList => {
      const listToGet = [];
      pokeList.results.forEach(poke => listToGet.push(this.details(poke.url)));
      return forkJoin(listToGet);
    }));
  }

  details(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
