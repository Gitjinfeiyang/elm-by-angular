import {Component, OnInit, HostBinding} from "@angular/core";
import {CityService} from "../../service/city-service";
import {City} from "../../Public/City";
import {routerAnimation, fadeInOut, fadeOut} from "../../animations";


@Component({
  selector:'choose-city',
  templateUrl:'city.component.html',
  styleUrls:['city.component.css'],
  animations:[routerAnimation,fadeOut]
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
    this.getGpsLocation();
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

  getGpsLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.cityService.getLocation(position)
          .then(response => {
            this.location=response;
          })
      }, (error) => {
        switch(error.code)
        {
          case error.PERMISSION_DENIED:
            break;
          case error.POSITION_UNAVAILABLE:
            alert('无法使用定位')
            break;
          case error.TIMEOUT:
            alert('定位超时')
            break;
        }
      });
    }
  }
}
