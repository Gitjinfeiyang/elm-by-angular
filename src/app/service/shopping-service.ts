import {Injectable, OnInit} from "@angular/core";
import {CityService} from "./city-service";
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from "rxjs";

@Injectable()
export class ShoppingService {
  constructor(private http: Http) {
    if (!this.location) {
      this.location = JSON.parse(localStorage.getItem('location')) || '';
    }
  }


  shopping = new Subject();
  shoppingCart$ = this.shopping.asObservable();

  location;
  offset = -20;
  sellerDetail;

  getCategory(): Promise<any> {
    return this.http.get('/api/v2/index_entry?geohash=' + this.location.geohash + '&group_type=1&flags[]=F')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getRecommendSeller() {
    this.offset += 20;
    return this.http.get(`/api/shopping/restaurants?latitude=${this.location.latitude}&longitude=${this.location.longitude}&offset=${this.offset}&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getSellerDetail(id) {
    return this.http.get(`/api/shopping/restaurant/${id}?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=${this.location.latitude}&longitude=${this.location.longitude}`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getMenu() {
    return this.http.get(`/api/shopping/v2/menu?restaurant_id=${this.sellerDetail.id}`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }
}

let imgUrl = 'https://fuss10.elemecdn.com';

export function getImgPath(path) {
  let suffix;
  if (!path) {
    return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
  }
  if (path.indexOf('jpeg') !== -1) {
    suffix = '.jpeg'
  } else {
    suffix = '.png'
  }
  let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
  return imgUrl + url;
}

export let debounce=(function () {
  let debounceControl=false;
  let debounceTime;
  return function debounce(fn) {

    if (debounceControl) {
      if (debounceTime) {
        clearTimeout(debounceTime);
      }
    }
    debounceControl = true;

    debounceTime = setTimeout(() => {
      fn();
      debounceControl = false;
    }, 200);

  }
})();
