import {Component} from "@angular/core";
import {ShoppingService} from "../../service/shopping-service";
@Component({
  selector:'conditions',
  templateUrl:'./conditions.component.html',
  styleUrls:['./conditions.component.css']
})
export class ConditionsComponent {
  constructor(
    private shoppingService:ShoppingService
  ){}

  schema;
  subCategories;

  deliveryMode;
  activity;

  condition;

  getDeliveryMode(){
    if(this.deliveryMode) return;
    this.shoppingService.getDeliveryMode()
      .then(response => {
        this.deliveryMode=response;
      })
  }

  getActivity(){
    if(this.activity) return;
    this.shoppingService.getActivity()
      .then(response => {
        this.activity=response;
      })
  }

  getSchema(){
      if(!this.schema){
        this.shoppingService.getSchema()
          .then(response=> {
            this.schema=response;
            this.getSubCategories(this.schema[1]);
          })
      }
  }

  getSubCategories(menu){
    if(menu.sub_categories){
      this.subCategories=menu.sub_categories;
    }
  }

  stopP(event){
    event.stopPropagation();
  }
}
