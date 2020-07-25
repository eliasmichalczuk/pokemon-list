import { IPokemonGetAllResult } from './../../entities/pokemon/pokemon-get-all-result.interface';
import { IPokemonAPIRequest } from './../../entities/pokemon-api/pokemon-api-request.interface';
import { IPokemon } from './../../entities/pokemon/pokemon.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PokemonGetAllService {

  private readonly _details = 'https://pokeapi.co/api/v2/pokemon/{0}';
  private currentRequest: IPokemonAPIRequest<IPokemonGetAllResult> = null;
  private readonly _resetUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  private _url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  get url(): string {
    return this._url;
  }

  get hasNext(): boolean {
    return !!this.currentRequest?.next;
  }

  get hasPrevious(): boolean {
    return !!this.currentRequest?.previous;
  }

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any[]> {
    return this.http.get<IPokemonAPIRequest<IPokemonGetAllResult>>(this.url).pipe(mergeMap(request => {
      const listToGet = [];
      this.currentRequest = request;
      request.results.forEach(poke => listToGet.push(this.details(poke.url)));
      return forkJoin(listToGet);
    }));
  }

  details(url: string): Observable<any> {
    return this.http.get<IPokemon>(url);
  }

  next(): Observable<any[]> {
    this._url = this.currentRequest.next;
    return this.get();
  }

  previous(): Observable<any[]> {
    this._url = this.currentRequest.previous;
    return this.get();
  }

  reset(): Observable<any[]> {
    this._url = this._resetUrl;
    return this.get();
  }
}
