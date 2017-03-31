import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user-service";


@Component({
  selector:'me-page',
  templateUrl:'./me.component.html'
})
export class MeComponent implements OnInit{
  constructor(
    private userService:UserService
  ){}

  ngOnInit(){
    console.log(this.userService.isLogined());
  }
}
