import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HectoToKgPipe } from './pipes/hecto-to-kg.pipe';
import { DecToCmPipe } from './pipes/dec-to-cm.pipe';



@NgModule({
  declarations: [HectoToKgPipe, DecToCmPipe],
  imports: [
    CommonModule
  ],
  exports: [
    HectoToKgPipe,
    DecToCmPipe
  ]
})
export class SharedModule { }
