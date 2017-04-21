import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";
import {ShoppingService} from "../../../service/shopping-service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [routerAnimation]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(private shoppingService: ShoppingService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  HEADTITLE = {
    CHECKOUT: '确认订单',
    CHOOSE_ADDRESS: '选择地址',
    ADD_ADDRESS: '添加新地址',
    EDIT_ADDRESS: '编辑地址',
    SEARCH_ADDRESS: '搜索地址'
  };
  htSort = []
  hideNav = true;
  headTitle;//head标题
  response;//checkout结果
  aAddress = [];//可用地址
  dAddress = [];//不可用地址
  editAddress: any = {};//正在编辑的地址
  searchAddressResult;//搜索地址

  ngOnInit() {
    console.log('checkout init')
    this.shoppingService.checkout({
      geohash: this.shoppingService.location.geohash
    })
      .then(response => {
        this.response = response;
      })
      .catch(err => {

      });
    this.route.queryParams
      .subscribe(params => {
        this.headTitle = params['target'] || this.HEADTITLE.CHECKOUT;
      })
  }

  ngOnDestroy() {

  }

  checkout(address) {
    this.shoppingService.checkout({
      geohash: address.geohash,
      // address_id: address.id,
    })
      .then(response => {
        this.response = response;
      })
      .catch(err => {

      })
  }

  saveAddress() {
    this.shoppingService.editAddress(this.editAddress)
      .then(response => {
        this.goTo(this.HEADTITLE.CHOOSE_ADDRESS);
        this.getAddress();
        this.editAddress = {};
      })
      .catch(err => {
        alert('请重新核对信息!')
      })
  }

  searchAddress = (keyword) => {
    this.shoppingService.searchAddress(keyword)
      .then(response => {
        this.searchAddressResult = response;
      })
  };
  back = (address) => {
    this.editAddress.address_detail = address.address;
    this.editAddress.address = address.name;
    this.editAddress.geohash = address.geohash;
    window.history.back();
  };

  getAddress() {
    this.aAddress = [];
    this.dAddress = [];
    this.shoppingService.getUserAddress(this.response.cart.id, this.response.sig)
      .then(response => {
        response.forEach(a => {
          if (a.is_deliverable) {
            this.aAddress.push(a);
          } else {
            this.dAddress.push(a);
          }
        })
      })
  }

  goTo(target) {
    this.router.navigate([], {queryParams: {target: target}})
  }

}
