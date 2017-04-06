import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppComponent }  from './app.component';
import {CityComponent} from "./pages/city.component/city.component";
import {HeadComponent} from "./components/head.component/head.component";
import {LocationComponent} from "./pages/location.component/location.component";

import {CityService} from "./service/city-service";
import {ShoppingService} from "./service/shopping-service";
import { LoginComponent } from './pages/login.component/login.component';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot([
        {
          path:'',
          redirectTo:'city',
          pathMatch:'full'
        },
        {
          path:'city',
          component:CityComponent
        },
        {
          path:'location/:id',
          component:LocationComponent
        },
        {
          path:'home/:geohash',
          loadChildren:'./pages/home.component/home.module#HomeModule'
        },
        {
          path:'login',
          component:LoginComponent
        }
      ]),

  ],
  declarations: [
    AppComponent,
    HeadComponent,
    CityComponent,
    LocationComponent,
    LoginComponent,
  ],
  providers:[
    CityService,
    ShoppingService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
