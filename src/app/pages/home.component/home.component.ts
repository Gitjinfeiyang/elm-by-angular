import {Component, OnInit, HostBinding, HostListener, AfterViewInit, ViewChild, AfterViewChecked} from "@angular/core";
import {ShoppingService,debounce} from "../../service/shopping-service";
import {routerAnimation, fadeOut} from "../../animations";
import {CityService} from "../../service/city-service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerAnimation, fadeOut]
})
export class HomeComponent implements OnInit,AfterViewChecked {
  constructor(
    private shoppingService: ShoppingService,
    private cityService:CityService,
    private route:ActivatedRoute,
    private router:Router

  ) {
  }

  location;

  category: any;
  recommendSellers: any;
  imgUrl = 'https://fuss10.elemecdn.com';
  screenH = window.innerHeight;
  pageH = 0;
  offset=0;
  keyword;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  //angular绑定滚动事件
  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    debounce(() => {
      let st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      if (st + this.screenH >= (this.pageH - 100)) {
        this.offset+=20;
        this.shoppingService.getRecommendSeller(this.offset)
          .then(sellers => {
            Array.prototype.push.apply(this.recommendSellers, sellers);
          });
      }
    });
  }

  ngAfterViewChecked(): void {
    this.pageH = document.body.scrollHeight;
  }

  ngOnInit() {
    this.route.parent.parent.params
      .switchMap((params: Params) => this.cityService.getLocationDetail(params['geohash']))
      .subscribe(location => {
        this.location=this.shoppingService.location=location;
        this.goShopping();
      });
    console.log('home onInit')
  }

  goTo(){
    this.router.navigate(['search'],{relativeTo:this.route.parent,queryParams:{
      keyword:this.keyword
    }})
  }

  goShopping() {
    this.shoppingService.getCategory()
      .then(category => this.category = category);

    this.shoppingService.getRecommendSeller(this.offset)
      .then(sellers => this.recommendSellers = sellers);
  }

  toCategory(id){
    this.router.navigate(['category'],{relativeTo:this.route.parent,queryParams:{
      id:id
    }});
  }


}
