import { PaginationModule } from './components/pagination/pagination/pagination.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HectoToKgPipe } from './pipes/hecto-to-kg.pipe';
import { DecToCmPipe } from './pipes/dec-to-cm.pipe';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';



@NgModule({
  declarations: [HectoToKgPipe, DecToCmPipe],
  imports: [
    CommonModule,
    PaginationModule
  ],
  exports: [
    HectoToKgPipe,
    DecToCmPipe,
    PaginationModule
  ]
})
export class SharedModule { }
