import { TestBed } from '@angular/core/testing';

import { PokemonGetByIdService } from './pokemon-get-by-id.service';

describe('PokemonGetByIdService', () => {
  let service: PokemonGetByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonGetByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
