import {Component, HostBinding, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";
import {ShoppingService} from "../../../service/shopping-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations:[routerAnimation]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display="block";

  constructor(
    private shoppingService:ShoppingService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  searchResult;
  restaurants=[];
  hotSearch;
  params:any={};
  keyword;
  empty=false;

  ngOnInit() {
    this.shoppingService.getHotSearch()
      .then(response => {
        this.hotSearch=response;
      })
      .catch(err => {
        console.log('未选择城市')
      })

    this.getSearchResult();
  }

  search(b){
    if(b){
      this.router.navigate([],{queryParams:{
        keyword:this.keyword
      }})
    }else{
      this.keyword='';
      window.history.replaceState('','',window.location.pathname);
      this.empty=false;
    }
  }

  getSearchResult(){
    this.route.queryParams
      .subscribe(params => {
        if(params['keyword']){
          this.shoppingService.getRecommendSeller({search:true,keyword:params['keyword']})
            .then(response => {
              this.restaurants=[];
              response.restaurant_with_foods.forEach((item) => {
                this.restaurants.push(item.restaurant);
              })
              if(this.restaurants.length<=0){
                this.empty=true;
              }
            })
        }
      });
  }

  paramschangedHandler(params){
    this.params=params;
    this.params.search=true;
    this.params.keyword=this.keyword;
    this.shoppingService.getRecommendSeller(this.params)
      .then(response => {
        this.restaurants=[];
        response.restaurant_with_foods.forEach((item) => {
          this.restaurants.push(item.restaurant);
        })
      })

  }

}
