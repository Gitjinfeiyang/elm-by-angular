import {Component, Input, AfterContentChecked} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector:'shopping-list',
  templateUrl:'./shopping-list.component.html',
  styleUrls:['shopping-list.component.css']
})
export class ShoppingListComponent{
  constructor(
    private route:ActivatedRoute,
    private router:Router
  ){}

  @Input() sellers:any;
  @Input() test:any;
  imgUrl='https://fuss10.elemecdn.com';

  getImgPath(path) {
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
    return this.imgUrl + url
  }

  toShop(id){
    this.router.navigate(['shop',id],{relativeTo:this.route.parent});
  }

}
