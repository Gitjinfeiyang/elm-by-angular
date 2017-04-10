import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";
<<<<<<< HEAD
import {LoadingComponent} from "./components/loading.component/loading.component";
import {CommonModule} from "@angular/common";


@NgModule({
  imports:[
    CommonModule
  ],
  exports:[
    HeadComponent,
    PopupComponent,
    LoadingComponent
  ],
  declarations:[
    HeadComponent,
    PopupComponent,
    LoadingComponent
=======


@NgModule({
  imports:[],
  exports:[
    HeadComponent,
    PopupComponent
  ],
  declarations:[
    HeadComponent,
    PopupComponent
>>>>>>> 1d8024f74c3020f0dd21744d3a20d11e2420d733
  ]
})
export class PublicModule{}
