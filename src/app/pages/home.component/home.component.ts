import {Component, OnInit, HostBinding} from "@angular/core";
import {CityService} from "../../service/city-service";
import {ShoppingService} from "../../service/shopping-service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {routerAnimation, fadeInOut} from "../../animations";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[routerAnimation,fadeInOut]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  constructor(private cityService: CityService,
              private shoppingService: ShoppingService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  location: any;
  category: any;
  recommendSellers: any;
  imgUrl='https://fuss10.elemecdn.com';
  animationDone=false;

  ngOnInit() {
    if(!this.shoppingService.location){
      this.location=JSON.parse(sessionStorage.getItem('location'));
    }else{
      this.location=this.shoppingService.location;
    }
    this.goShopping();
  }

  goShopping(){
    this.shoppingService.getCategory(this.location.geohash)
      .then(category => this.category = category);

    this.shoppingService.getRecommendSeller(this.location)
      .then(sellers => this.recommendSellers=sellers);
  }


}
