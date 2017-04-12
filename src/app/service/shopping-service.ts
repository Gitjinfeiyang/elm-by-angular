import {Injectable} from "@angular/core";
import {CityService} from "./city-service";
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShoppingService {
  constructor(
    private http:Http
  ){}

  location:any;
    offset=-20;

  getCategory(geohash:String):Promise<any>{
    return this.http.get('/api/v2/index_entry?geohash='+geohash+'&group_type=1&flags[]=F')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getRecommendSeller(location){
    this.offset+=20;
    return this.http.get(`/api/shopping/restaurants?latitude=${location.latitude}&longitude=${location.longitude}&offset=${this.offset}&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }
}
