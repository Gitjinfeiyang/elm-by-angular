import {Component, OnInit, Output, EventEmitter, AfterViewChecked, HostBinding, OnDestroy} from "@angular/core";
import {ShoppingService,getImgPath} from "../../../service/shopping-service";
import {Params, ActivatedRoute} from "@angular/router";
import {routerAnimation, fadeOut} from "../../../animations";


@Component({
  selector:'shop',
  templateUrl:'./shop.component.html',
  styleUrls:['./shop.component.css'],
  animations:[routerAnimation,fadeOut]
})
export class ShopComponent implements OnInit,AfterViewChecked,OnDestroy{
  constructor(
    private shoppingService:ShoppingService,
    private route:ActivatedRoute
  ){}

  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  content='menu';
  hideNav=true;//隐藏Nav 通过路由读取
  sellerDetail:any;
  menu:any;
  foodItem;
  contentH=window.innerHeight-260;
  shoppingCart=[];
  cost=0;
  count=0;
  remain=9999;

  ngOnInit(): void {
    this.shoppingService.shoppingCart$.subscribe( (shoppingCart:Array<any>) => {
      this.shoppingCart=shoppingCart;
      this.cost=0;
      this.count=0;
      for(let i=0; i<this.shoppingCart.length; i++){
        this.count+=this.shoppingCart[i].count;
        this.cost+=this.shoppingCart[i].count*this.shoppingCart[i].specfoods[0].price;
      }
    });

    this.route.params
      .switchMap((params:Params) => this.shoppingService.getSellerDetail(params['id']))
      .subscribe( detail => {
        this.sellerDetail=this.shoppingService.sellerDetail=detail;
        this.shoppingService.getMenu()
          .then(response => {
            this.menu=response;
            this.shoppingService.refreshCart();
          })
      });
  }

  ngAfterViewChecked(){
    this.foodItem=document.getElementsByClassName('food-item')[0];
  }

  ngOnDestroy(){
    if(this.sellerDetail){
      this.shoppingService.setCartHistory(this.menu);
    }
  }

  clearCart(){//返回后再清楚无效，因为food为重新生成的对象
    for(let i=0; i<this.shoppingService.shoppingCart['s'+this.sellerDetail.id].length; i++){
      this.shoppingService.shoppingCart['s'+this.sellerDetail.id][i].count=0;
    }
    this.shoppingService.shoppingCart['s'+this.sellerDetail.id]=null;
    this.shoppingService.refreshCart();
  }

  payButtonText(sellerDetail){
    this.remain=sellerDetail.float_minimum_order_amount-this.cost;
    if(this.remain>0){
      return '还差'+this.remain+'元起送';
    }else{
      return '提交订单';
    }
  }

  scrollTo(e){
    this.foodItem.scrollTop=document.getElementById(e.target.dataset.target).offsetTop-210;
  }


  getImgPath(path){
    return getImgPath(path);
  }

  goBack(){
    window.history.back();
  }
}
