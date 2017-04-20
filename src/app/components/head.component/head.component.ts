import {Location} from "@angular/common";
import {Component, Input} from "@angular/core";
@Component({
  selector:'head-nav',
  templateUrl:'head.component.html',
  styleUrls:['head.component.css']
})
export class HeadComponent {
  constructor(
    private location:Location
  ){}

  @Input() goTo:Function;

  goBack() {
    if(this.goTo){
      this.goTo()
    }else{
      window.history.back();
    }
  }

}
