import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";
import {LoadingComponent} from "./components/loading.component/loading.component";
import {CommonModule} from "@angular/common";
import {RatingComponent} from "./components/rating.component/rating.component";


@NgModule({
  imports:[
    CommonModule
  ],
  exports:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent
  ],
  declarations:[
    HeadComponent,
    PopupComponent,
    LoadingComponent,
    RatingComponent,
    LoadingComponent
  ]
})
export class PublicModule{}
