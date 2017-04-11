import {Component, OnInit, HostBinding} from "@angular/core";
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
  keyword:String;
  searchResult:any;
  searchHistory=[];

  ngOnInit(){
    this.route.params
      .switchMap((params: Params) => this.cityService.getCity(+params['id']))
      .subscribe(city => this.city = city);
    this.getSearchHistory();
  }

  search(){
    this.cityService.getSearchResult(this.city.id,this.keyword)
      .then(result => this.searchResult=result);
  }

  toHomePage(location:any){
    sessionStorage.setItem('geohash',location.geohash);
    this.router.navigate(['/home',location.geohash]);
  }

  setSearchHistory(result){
    this.cityService.setLocationSearchHistory(result);
  }

  getSearchHistory(){
    if(this.cityService.getLocationSearchHistory()){
      this.cityService.getLocationSearchHistory().forEach((e) => {
        this.searchHistory.push(JSON.parse(e));
      });
    }else{
      this.searchHistory=[{name:'无记录'}]
    }
  }

  clearSearchHistory(){
    this.cityService.clearLocationSearchHistory();
    this.searchHistory=[];
  }
}
