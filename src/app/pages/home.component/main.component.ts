import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShoppingService} from "../../service/shopping-service";
import {CityService} from "../../service/city-service";
@Component({
  selector:'main-page',
  template:`
<router-outlet></router-outlet>
<nav-footer></nav-footer>
`,
  styles:[]
})
export  class MainComponent implements OnInit{
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private shoppingService:ShoppingService,
    private cityService:CityService
  ){}

  ngOnInit(){
    this.route.params
      .switchMap((params: Params) => this.cityService.getLocationDetail(params['geohash']))
      .subscribe(location => {
        this.shoppingService.location = location;
        this.router.navigate(['home'],{relativeTo:this.route});
      });
  }
}
