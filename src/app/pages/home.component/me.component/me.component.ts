import {Component, OnInit, HostBinding} from "@angular/core";
import {UserService} from "../../../service/user-service";
import {routerAnimation} from "../../../animations";


@Component({
  selector:'me-page',
  templateUrl:'./me.component.html',
<<<<<<< HEAD
  styleUrls:['./me.component.css'],
  animations:[routerAnimation],
=======
  styleUrls:['./me.component.css']
>>>>>>> 1d8024f74c3020f0dd21744d3a20d11e2420d733
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
<<<<<<< HEAD
    // if(this.userService.isLogined()){
    //   this.userProfile=this.userService.getUserProfile();
    // }
=======
    if(this.userService.isLogined()){
      this.userProfile=this.userService.getUserProfile();
    }
>>>>>>> 1d8024f74c3020f0dd21744d3a20d11e2420d733
  }
}
