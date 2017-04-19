import {Component, HostBinding, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";
import {ShoppingService} from "../../../service/shopping-service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations:[routerAnimation]
})
export class CheckoutComponent implements OnInit {
  constructor(
    private shoppingService:ShoppingService
  ) { }

  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  hideNav=true;
  response;
  aAddress=[];
  dAddress=[];
  show='check';

  ngOnInit() {
    this.shoppingService.checkout({})
      .then(response => {
        this.response=response;
      })
      .catch(err => {

      })
  }

  getAddress(){
    this.shoppingService.getUserAddress(this.response.cart.id,this.response.sig)
      .then(response => {
        response.forEach( a=> {
         if(a.is_deliverable){
           this.aAddress.push(a);
         }else{
           this.dAddress.push(a);
         }
        })
      })
  }

}
