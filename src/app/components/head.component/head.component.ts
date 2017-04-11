import {Location} from "@angular/common";
import {Component} from "@angular/core";
@Component({
  selector:'head-nav',
  templateUrl:'head.component.html',
  styleUrls:['head.component.css']
})
export class HeadComponent {
  constructor(
    private location:Location
  ){}

  goBack() {
    window.history.back();

  }

}
