// tslint:disable-next-line:no-empty-interface
export interface IPokemonAPIRequest<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
