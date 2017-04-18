import {Component, HostBinding, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";
import {UserService} from "../../../service/user-service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations:[routerAnimation]
})
export class OrderComponent implements OnInit {
  constructor(
    private userService:UserService
  ) {}

  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  orderList;

  ngOnInit() {
    this.userService.requestOrders()
      .then(response => {
        this.orderList=response;
      })
      .catch(err => {
        console.log('未登录')
      })
  }

}
