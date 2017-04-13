import {Component, OnInit, HostBinding, HostListener, AfterViewInit, ViewChild, AfterViewChecked} from "@angular/core";
import {ShoppingService,debounce} from "../../service/shopping-service";
import {routerAnimation, fadeOut} from "../../animations";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerAnimation, fadeOut]
})
export class HomeComponent implements OnInit,AfterViewChecked {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor(private shoppingService: ShoppingService) {
    this.location=shoppingService.location;
  }

  location;
  category: any;
  recommendSellers: any;
  imgUrl = 'https://fuss10.elemecdn.com';
  screenH = window.innerHeight;
  pageH = 0;

  //angular绑定滚动事件
  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    debounce(() => {
      let st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      console.log(st,this.screenH,this.pageH);
      if (st + this.screenH >= (this.pageH - 100)) {
        this.shoppingService.getRecommendSeller()
          .then(sellers => {
            Array.prototype.push.apply(this.recommendSellers, sellers);
          });
      }
    });
  }

  ngAfterViewChecked(): void {
    this.pageH = document.body.scrollHeight;
  }

  ngOnInit() {
    this.goShopping();
  }

  goShopping() {
    this.shoppingService.getCategory()
      .then(category => this.category = category);

    this.shoppingService.getRecommendSeller()
      .then(sellers => this.recommendSellers = sellers);
  }


}
