import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceRoutingModule } from './source-routing.module';
import { SourceComponent } from './source.component';
import { ResourceComponent } from 'src/app/components/resource/resource.component';


@NgModule({
  declarations: [SourceComponent, ResourceComponent],
  imports: [
    CommonModule,
    SourceRoutingModule
  ]
})
export class SourceModule { }
