import {
  Component, Output, EventEmitter, Input, OnInit, HostBinding, ViewChild, AfterContentInit,
  AfterViewChecked, HostListener, AfterContentChecked, AfterViewInit, OnChanges
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
export class FoodsComponent implements OnInit,AfterViewChecked,AfterContentInit,AfterContentChecked,AfterViewInit,OnChanges{
  ngOnChanges(): void {
    // console.log('ngOnChanges ',document.getElementsByClassName('content-wrapper')[0])

  }
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit ',document.getElementsByClassName('content-wrapper')[0])

  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked ',document.getElementsByClassName('content-wrapper')[0])

  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit ',document.getElementsByClassName('content-wrapper')[0])

  }
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
    contentH=window.innerHeight-260;

  ngOnInit(){
    console.log('ngOnInit ',document.getElementsByClassName('content-wrapper')[0])
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
