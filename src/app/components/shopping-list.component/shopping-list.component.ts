import {Component, Input} from "@angular/core";



@Component({
  selector:'shopping-list',
  templateUrl:'./shopping-list.component.html',
  styleUrls:['shopping-list.component.css']
})
export class ShoppingListComponent {
  constructor(){}

  @Input() sellers:any;
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
}
