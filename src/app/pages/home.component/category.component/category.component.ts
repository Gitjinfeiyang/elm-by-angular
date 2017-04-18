import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostBinding, HostListener,
  OnChanges,
  OnInit, SimpleChanges
} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingService,debounce} from "../../../service/shopping-service";
import {routerAnimation} from "../../../animations";

let screenH=window.innerHeight;
let sh=0;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations:[routerAnimation]
})
export class CategoryComponent implements OnInit,AfterViewChecked{
  constructor(
    private route:ActivatedRoute,
    private shoppingService:ShoppingService
  ) { }

  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';


  categoryList;
  params:any={};
  offset=0;
  title;
  @HostListener('window:scroll',['$event'])
  scrollHandler(e){
    debounce(e => {
      let st=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      if(st>(sh-screenH-100)){
        this.offset+=20;
        this.params.offset=this.offset;
        this.shoppingService.getRecommendSeller(this.params)
          .then(response => {
            Array.prototype.push.apply(this.categoryList,response);
          })
      }
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.title=params['id'];
        this.shoppingService.getRecommendSeller({offset:this.offset,categoryId:'207'})
          .then(response => {
            this.categoryList=response;
          })
          .catch(response => {

          })
      })
  }

  ngAfterViewChecked(): void {
    sh=document.body.scrollHeight;
  }

  paramsChangedHandle(params){
    this.params=params;
    this.shoppingService.getRecommendSeller(params)
      .then(response => {
        this.categoryList=response;
      })
  }

}
