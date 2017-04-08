import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user-service";


@Component({
  selector:'me-page',
  templateUrl:'./me.component.html',
  styleUrls:['./me.component.css']
})
export class MeComponent implements OnInit{
  constructor(
    private userService:UserService
  ){}
  isLogined=false;
  userProfile:any;
  userAvatar;

  ngOnInit(){
    if(this.userService.isLogined()){
      this.userProfile=this.userService.getUserProfile();
    }
  }
}
