import {
  Component, Output, EventEmitter, Input, OnInit, HostBinding, ViewChild, AfterContentInit,
  AfterViewChecked, HostListener
} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingService,getImgPath,debounce} from "../../../../service/shopping-service";
import {routerAnimation, fadeInOut, fadeOut} from "../../../../animations";


@Component({
  selector:'foods',
  templateUrl:'./foods.component.html',
  styleUrls:['./foods.component.css'],
  animations:[routerAnimation,fadeOut]
})
export class FoodsComponent implements OnInit,AfterViewChecked{
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';
  // @HostListener('window:scroll',['$event'])
  // onscroll(e){
  //   debounce(() => {
  //
  //   })
  // }

  constructor(
    private route:ActivatedRoute,
    private shoppingService:ShoppingService
  ){
  }

  sellerDetail:any;
    menu:any;
    foodItem;

  ngOnInit(){
      this.route.params
        .switchMap((params:Params) => this.shoppingService.getSellerDetail(params['id']))
        .subscribe( detail => {
          this.sellerDetail=this.shoppingService.sellerDetail=detail;
          this.shoppingService.getMenu()
            .then(response => this.menu=response)
        });
  }
  ngAfterViewChecked(){
    this.foodItem=document.getElementsByClassName('food-item')[0];
  }

  scrollTo(e){
    this.foodItem.scrollTop=document.getElementById(e.target.dataset.target).offsetTop-210;
  }


  getImgPath(path){
    return getImgPath(path);
  }

}
