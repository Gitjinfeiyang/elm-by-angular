import { NgModule } from '@angular/core';
import {HeadComponent} from "./components/head.component/head.component";
import {PopupComponent} from "./components/popup.component/popup.component";


@NgModule({
  imports:[],
  exports:[
    HeadComponent,
    PopupComponent
  ],
  declarations:[
    HeadComponent,
    PopupComponent
  ]
})
export class PublicModule{}
