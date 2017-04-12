import {Component, OnInit, HostBinding, HostListener, AfterViewInit, ViewChild, AfterViewChecked} from "@angular/core";
import {CityService} from "../../service/city-service";
import {ShoppingService} from "../../service/shopping-service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {routerAnimation, fadeOut} from "../../animations";
import {$} from "protractor";
import {ShoppingListComponent} from "../../components/shopping-list.component/shopping-list.component";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerAnimation, fadeOut]
})
export class HomeComponent implements OnInit,AfterViewChecked {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor(private cityService: CityService,
              private shoppingService: ShoppingService,
              private router: Router,
              private route: ActivatedRoute,) {
  }


  location: any;

  category: any;
  recommendSellers: any;
  imgUrl = 'https://fuss10.elemecdn.com';
  debounce = false;//去抖
  debounceTime: any;
  screenH = window.innerHeight;
  pageH = 0;
  //angular绑定滚动事件
  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    if (this.debounce) {
      if (this.debounceTime) {
        clearTimeout(this.debounceTime);
      }
    }
    this.debounce = true;

    this.debounceTime = setTimeout(() => {
      let st = document.body.scrollTop;
      if (st + this.screenH >= (this.pageH - 5)) {
        this.shoppingService.getRecommendSeller(this.location)
          .then(sellers => {
            Array.prototype.push.apply(this.recommendSellers, sellers);
          });
      }
      this.debounce = false;
    }, 200);

  }

  ngAfterViewChecked(): void {
    this.pageH = document.body.scrollHeight;
  }

  ngOnInit() {
    if (!this.shoppingService.location) {
      this.location = JSON.parse(sessionStorage.getItem('location'));
    } else {
      this.location = this.shoppingService.location;
    }
    this.goShopping();
  }

  goShopping() {
    this.shoppingService.getCategory(this.location.geohash)
      .then(category => this.category = category);

    this.shoppingService.getRecommendSeller(this.location)
      .then(sellers => this.recommendSellers = sellers);
  }


}
