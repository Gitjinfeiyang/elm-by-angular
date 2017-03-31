import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

import { AppComponent }  from './app.component';
import {CityComponent} from "./pages/city.component/city.component";
import {HeadComponent} from "./components/head.component/head.component";
import {LocationComponent} from "./pages/location.component/location.component";

import {CityService} from "./service/city-service";
// import {HomeComponent} from "./pages/home.component/home.component";
import {ShoppingService} from "./service/shopping-service";
import {NavComponent} from "./components/nav.component/nav.component";
import {ShoppingListComponent} from "./components/shopping-list.component/shopping-list.component";
import {HomeModule} from "./pages/home.component/home.module";

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
        }
        // {
        //   path:'main',
        //   component:MainComponent,
        //   children:[
        //     {
        //       path:'home/:geohash',
        //       component:HomeComponent
        //     }
        //   ]
        // }
      ]),

  ],
  declarations: [
    AppComponent,
    HeadComponent,
    CityComponent,
    LocationComponent,
    // HomeComponent,
    // NavComponent,
    // ShoppingListComponent,
  ],
  providers:[
    CityService,
    ShoppingService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
