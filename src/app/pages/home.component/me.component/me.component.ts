import {Component, OnInit, HostBinding} from "@angular/core";
import {UserService} from "../../../service/user-service";
import {routerAnimation} from "../../../animations";


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
    private userService:UserService
  ){}
  isLogined=false;
  userProfile:any;
  userAvatar;

  ngOnInit(){
    // if(this.userService.isLogined()){
    //   this.userProfile=this.userService.getUserProfile();
    // }
  }
}
