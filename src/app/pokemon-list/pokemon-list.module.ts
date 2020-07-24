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
    PokemonListRoutingModule
  ],
  exports: [
    PokemonListComponent
  ],
  providers: [
    PokemonGetAllService,
    PokemonFavoriteSalvarService
  ]
})
export class PokemonListModule { }
