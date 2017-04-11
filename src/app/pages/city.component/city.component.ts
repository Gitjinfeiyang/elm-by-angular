import {Component, OnInit, HostBinding} from "@angular/core";
import {CityService} from "../../service/city-service";
import {City} from "../../Public/City";
import {routerAnimation, fadeInOut} from "../../animations";


@Component({
  selector:'choose-city',
  templateUrl:'city.component.html',
  styleUrls:['city.component.css'],
  animations:[routerAnimation,fadeInOut]
})
export class CityComponent implements OnInit{
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display='block';

  constructor(private cityService:CityService){}

  location:City;
  hotCities:City[];
  allCities=[];

  ngOnInit(){
    this.getCities();
  }

  getCities(){
    this.cityService.getLocation().then(city => this.location=city);
    this.cityService.getHotCity().then(cities => this.hotCities=cities);
    this.cityService.getAllCity().then(cities => {
      for(let i=0,o=65;o<91; i++,o++){
          this.allCities[i]={
            index:String.fromCharCode(o),
            cities:cities[String.fromCharCode(o)]
          }
      }
    });
  }
}
