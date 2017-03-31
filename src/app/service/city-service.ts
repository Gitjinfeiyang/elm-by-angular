
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {City} from "../Public/City";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CityService {
  constructor(private http:Http){}

  getLocation():Promise<City>{
    return this.http.get('/api/v1/cities?type=guess')
      .toPromise()
      .then(response => response.json() as City)//得到的为对象数组，转化为City类型
      .catch(err => console.log(err));
  }

  getHotCity():Promise<City[]>{
    return this.http.get('/api/v1/cities?type=hot')
      .toPromise()
      .then(response => response.json() as City[])//得到的为对象数组，转化为City类型
      .catch(err => console.log(err));
  }

  getAllCity():Promise<any>{
    return this.http.get('/api/v1/cities?type=group')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getCity(id:Number):Promise<City>{
    return this.http.get('/api/v1/cities/'+id)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getSearchResult(cityId:Number,keyword:String){
    return this.http.get('/api/v1/pois?type=search&city_id='+cityId+'&keyword='+keyword)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getLocationDetail(geohash:String){
    return this.http.get('/api/v2/pois/'+geohash)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  setLocationSearchHistory(result:any){
    let locationHistory=localStorage.getItem('locationHistory');
    if(locationHistory){
      localStorage.setItem('locationHistory',locationHistory.concat('****',JSON.stringify(result)));
    }else{
      localStorage.setItem('locationHistory',JSON.stringify(result));
    }
  }

  getLocationSearchHistory(){
    return localStorage.getItem('locationHistory')?localStorage.getItem('locationHistory').split('****'):undefined;
  }
}
