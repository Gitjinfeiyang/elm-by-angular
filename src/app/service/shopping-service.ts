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
  shoppingCart = {};

  location;
  sellerDetail;
  sellerId;

  searchAddress(keyword){
    return this.http.get(`/api/v1/pois?type=nearby&keyword=${keyword}`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        console.log(response.json())
      })
  }

  editAddress(address) {//添加地址id填空字符串
    return this.http.post(`/api/v1/users/145808345/addresses/${address.id||''}`, {
      "name": address.name,
      "sex": address.sex||'',
      "phone": address.phone,
      "phone_bk": address.phone_bk||'',
      "address": address.address,
      "address_detail": address.address_detail,
      "poi_type": address.poi_type||0,
      "geohash": address.geohash
    })
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()));
      })
  }

  queryOrder() {
    return this.http.get(`https://pay.ele.me/payapi/payment/queryOrder?merchantId=5&merchantOrderNo=1205353604872840363&source=MOBILE_WAP&userId=145808345&version=1.0.0`)
  }

  order() {
    return this.http.options(`/api/v1/users/145808345/carts/d8d04c3e249611e79a53e4a8b6cc490e/orders`)
  }

  getRemarks() {
    return this.http.get(`v1/carts/d8d04c3e249611e79a53e4a8b6cc490e/remarks?sig=042f6e8de841514b04b9d5fc4cbf4801`)
  }

  getUserAddress(id: any, sig: any) {
    return this.http.get(`/api/v1/carts/${id}/addresses?sig=${sig}`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        console.log(response);
      })
  }

  checkout(options) {
      if(!this.shoppingCart['s'+this.sellerId]){//此时sellerId为undefined
        this.shoppingCart['s'+this.sellerId]=JSON.parse(sessionStorage.getItem('shoppingcart'));
      }
    let entities = [];
    entities[0] = [];
    this.shoppingCart['s' + this.sellerId].forEach(food => {
      entities[0].push({
        "attrs": options.attrs || [],
        "extra": options.extra || {},
        "id": food.food_id,
        "name": food.name,
        "packing_fee": food.packing_fee,
        "price": food.price,
        "quantity": food.count,
        "sku_id": food.sku_id,
        "specs": food.specs,
        "stock": food.stock
      })
    });
    return this.http.post(`/api/v1/carts/checkout`, {
      "come_from": "web",
      "geohash": options.geohash,
      "address_id": options.address_id || null,
      "deliver_time": options.deliver_time || null,
      "entities": entities,
      "invoice": options.invoice || null,
      "paymethod_id": options.paymethod || null
    })
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        console.log(response.json())
      })
  }

  getScore() {
    return this.http.get(`/api/ugc/v2/restaurants/${this.sellerId}/ratings/scores`)
  }

  getTags() {
    return this.http.get(`/api/ugc/v2/restaurants/${this.sellerId}/ratings/tags`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        console.log(response)
      })
  }

  getRatings(offset, tagName) {
    return this.http.get(`/api/ugc/v2/restaurants/${this.sellerId}/ratings?has_content=true&tag_name=${tagName}&offset=${offset || 0}&limit=10`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        console.log(response)
      })
  }

  getActivity() {
    return this.http.get(`/api/shopping/v1/restaurants/activity_attributes?latitude=${this.location.latitude}&longitude=${this.location.longitude}&kw=`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        console.log(response)
      })
  }

  getDeliveryMode() {
    return this.http.get(`/api/shopping/v1/restaurants/delivery_modes?latitude=${this.location.latitude}&longitude=${this.location.longitude}&kw=`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        console.log(response)
      })
  }

  getSchema() {
    return this.http.get(`/api/shopping/restaurant/category/urlschema?latitude=${this.location.latitude}&longitude=${this.location.longitude}&flavor_ids[]=207&flavor_ids[]=220&flavor_ids[]=233&flavor_ids[]=260&show_name=%E7%BE%8E%E9%A3%9F`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        console.log(response);
      })
  }

  getCategoryList(offset, id) {
    return this.http.get(`/api/shopping/restaurants?latitude=${this.location.latitude}&longitude=${this.location.longitude}&keyword=&offset=${offset}&limit=20&extras[]=activities&restaurant_category_ids[]=207`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response => {
        console.log(response)
      })
  }

  getCategory(): Promise<any> {
    return this.http.get('/api/v2/index_entry?geohash=' + this.location.geohash + '&group_type=1&flags[]=F')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getHotSearch() {
    return this.http.get(`/api/shopping/v3/hot_search_words?latitude=${this.location.latitude}&longitude=${this.location.longitude}`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()))
      })
  }

  getRecommendSeller(params) {
    let activity = '';
    if (params.activities) {
      params.activities.forEach(function (id) {
        activity += '&support_ids[]=' + id;
      })
    }
    return this.http.get(`/api/shopping/restaurants${params.search ? '/search' : ''}?latitude=${this.location.latitude}&longitude=${this.location.longitude}&offset=${params.offset || 0}&limit=20&extras[]=activities&keyword=${params.keyword || ''}&search_item_type=${params.searchType || 2}&restaurant_category_id=&restaurant_category_ids[]=${params.categoryId || ''}&order_by=${params.orderBy || ''}&delivery_mode[]=${params.deliveryMode || ''}${activity}`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getSellerDetail(id) {
    this.sellerId = id;
    return this.http.get(`/api/shopping/restaurant/${id}?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=${this.location.latitude}&longitude=${this.location.longitude}`)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getMenu() {//查看是否有缓存
    let history = sessionStorage.getItem('s' + this.sellerDetail.id);
    if (history && this.shoppingCart['s' + this.sellerId] && this.shoppingCart['s' + this.sellerId].length > 0) {
      return Promise.resolve(JSON.parse(history));
    } else {
      return this.http.get(`/api/shopping/v2/menu?restaurant_id=${this.sellerId}`)
        .toPromise()
        .then(response => response.json())
        .catch(err => console.log(err));
    }
  }

  setCartHistory(menu) {//如果购物车不为空 将菜单缓存，以便跟购物车同步
    if (this.shoppingCart['s' + this.sellerDetail.id] && this.shoppingCart['s' + this.sellerDetail.id].length > 0) {
      sessionStorage.setItem('s' + this.sellerDetail.id, JSON.stringify(menu));
    } else {
      sessionStorage.removeItem('s' + this.sellerDetail.id);
    }
  }

  addToCart(food) {//加入购物车，并且标识商家id ，保存在service中
    if (!this.shoppingCart['s' + this.sellerDetail.id]) {
      this.shoppingCart['s' + this.sellerDetail.id] = [];
    }
    this.shoppingCart['s' + this.sellerDetail.id].push(food);
    return this.shoppingCart['s' + this.sellerDetail.id].length - 1;
  }

  subtractCart(index) {//移除购物车
    this.shoppingCart['s' + this.sellerDetail.id].splice(index, 1);
  }

  refreshCart() {//刷新购物车
    if (this.shoppingCart['s' + this.sellerDetail.id]) {
      this.shopping.next(this.shoppingCart['s' + this.sellerDetail.id]);
    } else {
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

export let debounce = (function () {
  let debounceControl = false;
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
