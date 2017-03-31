import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {City} from "../../Public/City";
import {CityService} from "../../service/city-service";



@Component({
  selector:'location-search',
  templateUrl:'./location.component.html',
  styleUrls:['./location.component.css']
})
export class LocationComponent implements OnInit{
  constructor(
    private route:ActivatedRoute,
    private cityService:CityService,
    private router:Router
  ){}

  city:City;
  keyword:String;
  searchResult:any;

  ngOnInit(){
    this.route.params
      .switchMap((params: Params) => this.cityService.getCity(+params['id']))
      .subscribe(city => this.city = city);
  }

  search(){
    this.cityService.getSearchResult(this.city.id,this.keyword)
      .then(result => this.searchResult=result);
  }

  toHomePage(location:any){
    this.router.navigate(['/home',location.geohash]);
  }
}
