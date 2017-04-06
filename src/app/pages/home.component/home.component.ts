import {Component, OnInit} from "@angular/core";
import {CityService} from "../../service/city-service";
import {ShoppingService} from "../../service/shopping-service";
import {Router, ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private cityService: CityService,
              private shoppingService: ShoppingService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  location: any;
  category: any;
  recommendSellers: any;
  imgUrl='https://fuss10.elemecdn.com';

  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => this.cityService.getLocationDetail(params['geohash']))
    //   .subscribe(location => {
    //     this.shoppingService.location = this.location = location;
    //     this.goShopping();
    //   });
    this.location=this.shoppingService.location;
    this.goShopping();
  }

  goShopping(){
    this.shoppingService.getCategory(this.location.geohash)
      .then(category => this.category = category);

    this.shoppingService.getRecommendSeller()
      .then(sellers => this.recommendSellers=sellers);
  }


}
