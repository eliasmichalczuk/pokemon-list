import { TestBed } from '@angular/core/testing';

import { PokemonFavoriteSalvarService } from './pokemon-favorite-salvar.service';

describe('PokemonFavoriteSalvarService', () => {
  let service: PokemonFavoriteSalvarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFavoriteSalvarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
