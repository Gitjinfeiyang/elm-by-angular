import {Component, OnInit, HostBinding} from "@angular/core";
import {UserService} from "../../../service/user-service";
import {routerAnimation} from "../../../animations";
import {ShoppingService} from "../../../service/shopping-service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector:'me-page',
  templateUrl:'./me.component.html',
  styleUrls:['./me.component.css'],
  animations:[routerAnimation],
})
export class MeComponent implements OnInit{
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display')   display = 'block';

  constructor(
    private userService:UserService,
    private shoppingService:ShoppingService,
    private route:ActivatedRoute,
    private router:Router
  ){}
  isLogined=false;
  userProfile:any;
  userAvatar;

  ngOnInit(){
    this.userService.getUserProfile()
      .then(response => {
        this.userProfile=this.userService.userProfile=response;
      })
      .catch(err => {
        console.log(err);
      })
  }

  goUser(){
    this.router.navigate(['user'],{relativeTo:this.route})
  }
}
