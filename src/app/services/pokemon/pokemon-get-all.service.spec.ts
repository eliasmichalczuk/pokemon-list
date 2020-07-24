import { TestBed } from '@angular/core/testing';

import { PokemonGetAllService } from './pokemon-get-all.service';

describe('PokemonGetAllService', () => {
  let service: PokemonGetAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonGetAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
