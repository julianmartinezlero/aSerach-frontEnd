import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './router/app-routing.module';
import { MapComponent } from './components/map/map.component';
import {MapLineComponent} from './components/map/map-line.component';
import {MapCircleComponent} from './components/map/map-circle.component';
import {AstarService} from './service/astar.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapLineComponent,
    MapCircleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AstarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
