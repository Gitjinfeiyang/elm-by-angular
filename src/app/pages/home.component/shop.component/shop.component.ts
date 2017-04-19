import {Component, OnInit, Output, EventEmitter, AfterViewChecked, HostBinding, OnDestroy} from "@angular/core";
import {ShoppingService,getImgPath} from "../../../service/shopping-service";
import {Params, ActivatedRoute, Router} from "@angular/router";
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
    private route:ActivatedRoute,
    private router:Router
  ){}

  // @HostBinding('@routeAnimation') routeAnimation=true;
  // @HostBinding('style.display') display='block';

  content='menu';
  hideNav=true;//隐藏Nav 通过路由读取
  sellerDetail:any;
  ratings;
  tags;
  menu:any;
  foodItem;
  contentH=window.innerHeight-260;
  shoppingCart=[];
  cost=0;
  count=0;
  remain=9999;
  offset=0;
  tagName='';

  ngOnInit(): void {
    this.shoppingService.shoppingCart$.subscribe( (shoppingCart:Array<any>) => {
      this.shoppingCart=shoppingCart;
      this.cost=0;
      this.count=0;
      for(let i=0; i<this.shoppingCart.length; i++){
        this.count+=this.shoppingCart[i].count;
        this.cost+=this.shoppingCart[i].count*this.shoppingCart[i].price;
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

  checkout(){
    this.router.navigate(['checkout'],{relativeTo:this.route.parent})
    sessionStorage.setItem('shoppingcart',JSON.stringify(this.shoppingCart));
  }

  loadMoreComments=() => {
    this.offset+=10;
    this.shoppingService.getRatings(this.offset,this.tagName)
      .then(response => {
        Array.prototype.push.apply(this.ratings,response);
      })
  }

  ngAfterViewChecked(){
    this.foodItem=document.getElementsByClassName('food-item')[0];
  }

  ngOnDestroy(){
    if(this.sellerDetail){
      this.shoppingService.setCartHistory(this.menu);
    }
  }

  getRating(){
      this.shoppingService.getRatings(this.offset,this.tagName)
        .then(response => {
          this.ratings=response;
        });
  }

  getTags(){
    if(!this.tags){
      this.shoppingService.getTags()
        .then(response => {
          this.tags=response;
        })
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
