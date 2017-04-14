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

  add(){
    if((!this.food.count)||this.food.count<=0){
      this.food.count=1;
      this.index=this.shoppingService.addToCart(this.food);
    }else{
      this.food.count+=1;
    }
    this.shoppingService.refreshCart();
  }

  subtract(){
    this.food.count-=1;
    if(this.food.count<=0){
      this.shoppingService.subtractCart(this.index);
    }
    this.shoppingService.refreshCart();
  }
}
