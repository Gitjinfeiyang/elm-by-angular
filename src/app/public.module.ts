import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";
import {LoadingComponent} from "./components/loading.component/loading.component";
import {CommonModule} from "@angular/common";
import {RatingComponent} from "./components/rating.component/rating.component";
import {ScrollLoadDirective} from "./scrollLoad.directive";
import {SearchCityComponent} from "./components/search-city.component/search-city.component";
import {FormsModule} from "@angular/forms";
import {AddAnimationDirective} from "./addAnimation.directive";


@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  exports:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent,
    ScrollLoadDirective,
    SearchCityComponent,
    AddAnimationDirective

  ],
  declarations:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent,
    ScrollLoadDirective,
    SearchCityComponent,
    AddAnimationDirective

  ]
})
export class PublicModule{
  constructor(){
    console.log('publicModule init')
  }
}
