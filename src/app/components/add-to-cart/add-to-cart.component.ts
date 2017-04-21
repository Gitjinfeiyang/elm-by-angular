import {Component, Input} from "@angular/core";
import {ShoppingService} from "../../service/shopping-service";
@Component({
  selector:'add-to-cart',
  templateUrl:'./add-to-cart.component.html',
  styleUrls:['./add-to-cart.component.css']
})
export class AddToCartComponent{
  constructor(
    private shoppingService:ShoppingService
  ){}

  @Input() food;
    index;//记录在shoppingcart中的位置
  showPanel=false;
  tempFood=[];
  itemChoose;

  chooseItem(item){
    if(this.itemChoose==item){
      this.itemChoose={};
    }else{
      this.itemChoose=item;
    }
    console.log(this.itemChoose==item);
  }

  show(){
    this.showPanel=!this.showPanel;
  }

  add(food){
    if((!food.count)||food.count<=0){
      food.count=1;
      this.index=this.shoppingService.addToCart(food);
    }else{
      food.count+=1;
    }
    this.shoppingService.refreshCart();
  }

  subtract(food){
    food.count-=1;
    if(food.count<=0){
      this.shoppingService.subtractCart(this.index);
    }
    this.shoppingService.refreshCart();
  }
}
