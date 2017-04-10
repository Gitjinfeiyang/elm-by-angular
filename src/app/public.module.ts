import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";
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
  ]
})
export class PublicModule{}
