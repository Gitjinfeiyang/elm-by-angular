import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "../../components/shopping-list.component/shopping-list.component";
import {NavComponent} from "../../components/nav.component/nav.component";
import {HomeComponent} from "./home.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CityService} from "../../service/city-service";
import {ShoppingService} from "../../service/shopping-service";
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";
import {UserService} from "../../service/user-service";
import {MeComponent} from "./me.component/me.component";


@NgModule({
  imports:[
    //BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      {
        path:'',
        component:MainComponent,
        children:[
          {
            path:'',
            component:HomeComponent,
          },
          {
            path:'me',
            component:MeComponent
          }
        ]
      },


    ])
  ],
  declarations:[
    HomeComponent,
    NavComponent,
    ShoppingListComponent,
    MainComponent,
    MeComponent
  ],
  exports:[
    // HomeComponent
  ],
  providers:[
    CityService,
    ShoppingService,
    UserService
  ],
  bootstrap:[]
})
export class HomeModule {

}
