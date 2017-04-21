import {Component, HostBinding, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";
import {UserService} from "../../../service/user-service";
import {ShoppingService,getImgPath} from "../../../service/shopping-service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations:[routerAnimation]
})
export class OrderComponent implements OnInit {
  constructor(
    private userService:UserService,
    private shoppingService:ShoppingService
  ) {}

  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  orderList;
  logined;

  ngOnInit() {
    this.userService.isLogined()
      .then(() => {
        this.logined=true;
        this.userService.requestOrders()
          .then(response => {
            this.orderList=response;
          })
          .catch(err => {
            this.logined=false;
          })
      })
      .catch(err => {
        this.logined=false;
      })

  }

  getImgPath(path){
    return getImgPath(path);
  }

}
