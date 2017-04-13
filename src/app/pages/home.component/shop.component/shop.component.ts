import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {ShoppingService} from "../../../service/shopping-service";


@Component({
  selector:'shop',
  templateUrl:'./shop.component.html',
  styleUrls:['./shop.component.css']
})
export class ShopComponent implements OnInit{
  constructor(
    private shoppingService:ShoppingService
  ){}

  hideNav=true;//隐藏Nav 通过路由读取

  ngOnInit(): void {
    this.shoppingService.shoppingCart$.subscribe( t => {
      console.log(t);
    })
  }
}
