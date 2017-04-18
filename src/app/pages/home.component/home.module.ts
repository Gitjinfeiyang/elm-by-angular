import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "../../components/shopping-list.component/shopping-list.component";
import {NavComponent} from "../../components/nav.component/nav.component";
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CityService} from "../../service/city-service";
import {ShoppingService} from "../../service/shopping-service";
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";
import {UserService} from "../../service/user-service";
import {MeComponent} from "./me.component/me.component";
import {PublicModule} from "../../public.module";
import {ShopComponent} from "./shop.component/shop.component";
import {FoodComponent} from "./shop.component/food.component/food.component";
import {AddToCartComponent} from "../../components/add-to-cart/add-to-cart.component";
import { CategoryComponent } from './category.component/category.component';
import {ConditionsComponent} from "../../components/conditions.component/conditions.component";
import { SearchComponent } from './search.component/search.component';
import {ScrollLoadDirective} from "../../scrollLoad.directive";
import { OrderComponent } from './order.component/order.component';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    HttpModule,
    PublicModule,
    RouterModule.forChild([
      {
        path:'',
        redirectTo:'main',
        pathMatch:'full'
      },
      {
        path:'main',
        component:MainComponent,
        children:[
          {
            path:'',
            redirectTo:'home',
            pathMatch:'full'
          },
          {
            path:'home',
            component:HomeComponent
          },
          {
            path:'me',
            component:MeComponent
          },
          {
            path:'search',
            component:SearchComponent
          },
          {
            path:'order',
            component:OrderComponent
          },
          {
            path:'shop/:id',
            component:ShopComponent
          },
          {
            path:'category',
            component:CategoryComponent
          }
        ]
      }



    ])
  ],
  declarations:[
    HomeComponent,
    NavComponent,
    ShoppingListComponent,
    MainComponent,
    MeComponent,
    ShopComponent,
    FoodComponent,
    AddToCartComponent,
    CategoryComponent,
    ConditionsComponent,
    SearchComponent,
    OrderComponent,
  ],
  exports:[
  ],
  providers:[
    // CityService,
    ShoppingService,
    // UserService
  ],
  bootstrap:[]
})
export class HomeModule {
constructor(){
  console.log('homeModule init')
}
}
