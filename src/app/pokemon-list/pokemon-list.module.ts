import { PokemonGetByIdService } from './../services/pokemon/pokemon-get-by-id.service';
import { SharedModule } from './../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonGetAllService } from '../services/pokemon/pokemon-get-all.service';
import { PokemonFavoriteSalvarService } from '../services/pokemon/pokemon-favorite-salvar.service';



@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    SharedModule
  ],
  exports: [
    PokemonListComponent
  ],
  providers: [
    PokemonGetAllService,
    PokemonFavoriteSalvarService,
    PokemonGetByIdService
  ]
})
export class PokemonListModule { }
