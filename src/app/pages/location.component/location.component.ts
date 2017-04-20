import {Component, OnInit, HostBinding, Input} from "@angular/core";
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {City} from "../../Public/City";
import {CityService} from "../../service/city-service";
import {routerAnimation} from "../../animations";



@Component({
  selector:'location-search',
  templateUrl:'./location.component.html',
  styleUrls:['./location.component.css'],
  animations:[routerAnimation]
})
export class LocationComponent implements OnInit{
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  constructor(
    private route:ActivatedRoute,
    private cityService:CityService,
    private router:Router
  ){}


  city:City;
  searchResult:any;

  ngOnInit(){
    if(this.route.snapshot.params['id']){
      this.cityService.getCity(+this.route.snapshot.params['id'])
        .then(response =>this.city=response);
    }else{

    }
  }

  search=(keyword) => {
      this.cityService.getSearchResult(this.city.id,keyword)
        .then(result => this.searchResult=result);
  }

  toHomePage=(location:any) => {
      localStorage.setItem('geohash',location.geohash);
      this.router.navigate(['/home',location.geohash]);
  }


}
