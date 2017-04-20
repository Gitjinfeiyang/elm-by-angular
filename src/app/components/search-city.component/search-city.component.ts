import {Component, Input, OnInit} from "@angular/core";
import {CityService} from "../../service/city-service";
@Component({
  selector:'search-city',
  templateUrl:'./search-city.component.html',
  styleUrls:['./search-city.component.css']
})
export class SearchCityComponent implements OnInit{
  constructor(
    private cityService:CityService
  ){}

  ngOnInit(){
      this.getSearchHistory();
  }

  @Input() search:Function;
  @Input() goTo:Function;
  @Input() searchResult:any;

  keyword;
  searchHistory=[];


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
