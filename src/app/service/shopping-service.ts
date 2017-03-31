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

  getCategory(geohash:String):Promise<any>{
    return this.http.get('/api/v2/index_entry?geohash='+geohash+'&group_type=1&flags[]=F')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getRecommendSeller(){
    return this.http.get(`/api/shopping/restaurants?latitude=${this.location.latitude}&longitude=${this.location.longitude}&
        offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=
        &delivery_mode[]=`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }
}
