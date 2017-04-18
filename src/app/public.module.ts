import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";
import {LoadingComponent} from "./components/loading.component/loading.component";
import {CommonModule} from "@angular/common";
import {RatingComponent} from "./components/rating.component/rating.component";
import {ScrollLoadDirective} from "./scrollLoad.directive";


@NgModule({
  imports:[
    CommonModule
  ],
  exports:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent,
    ScrollLoadDirective
  ],
  declarations:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent,
    ScrollLoadDirective
  ]
})
export class PublicModule{
  constructor(){
    console.log('publicModule init')
  }
}
