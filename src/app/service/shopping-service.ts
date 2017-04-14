import {Injectable, OnInit} from "@angular/core";
import {CityService} from "./city-service";
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject, Observable} from "rxjs";

@Injectable()
export class ShoppingService {
  constructor(private http: Http) {
    if (!this.location) {
      this.location = JSON.parse(localStorage.getItem('location')) || '';
    }
    console.log('shoppingservice Init')
  }

  //保存购物车
  shopping = new Subject();
  shoppingCart$ = this.shopping.asObservable();
  shoppingCart={};

  location;
  offset = -20;
  sellerDetail;
  sellerId;

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
    this.sellerId=id;
    return this.http.get(`/api/shopping/restaurant/${id}?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=${this.location.latitude}&longitude=${this.location.longitude}`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getMenu() {//查看是否有缓存
    let history=sessionStorage.getItem('s'+this.sellerDetail.id);
    if(history){
      return Promise.resolve(JSON.parse(history));
    }else{
      return this.http.get(`/api/shopping/v2/menu?restaurant_id=${this.sellerId}`)
        .toPromise()
        .then(response => response.json())
        .catch(err => console.log(err));
    }
  }

  setCartHistory(menu){//如果购物车不为空 将菜单缓存，以便跟购物车同步
    if(this.shoppingCart['s'+this.sellerDetail.id]&&this.shoppingCart['s'+this.sellerDetail.id].length>0){
      sessionStorage.setItem('s'+this.sellerDetail.id,JSON.stringify(menu));
    }else{
      sessionStorage.removeItem('s'+this.sellerDetail.id);
    }
  }

  addToCart(food){//加入购物车，并且标识商家id ，保存在service中
    if(!this.shoppingCart['s'+this.sellerDetail.id]){
      this.shoppingCart['s'+this.sellerDetail.id]=[];
    }
    this.shoppingCart['s'+this.sellerDetail.id].push(food);
    return this.shoppingCart['s'+this.sellerDetail.id].length-1;
  }

  subtractCart(index){//移除购物车
    this.shoppingCart['s'+this.sellerDetail.id].splice(index,1);
  }

  refreshCart(){//刷新购物车
    if(this.shoppingCart['s'+this.sellerDetail.id]){
      this.shopping.next(this.shoppingCart['s'+this.sellerDetail.id]);
    }else{
      this.shopping.next([]);
    }
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
