import {Component, Input, AfterContentChecked} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {getImgPath} from "../../service/shopping-service";



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

  toShop(id){
    this.router.navigate(['shop',id],{relativeTo:this.route.parent});
  }

  getImgPath(path){
    return getImgPath(path);
  }

}
