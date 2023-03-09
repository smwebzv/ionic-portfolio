import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapModule { }
