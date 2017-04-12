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
<<<<<<< HEAD

=======
=======
<<<<<<< HEAD

  goBack(){
    window.history.back();
=======
  goBack(){
    this.location.back();
>>>>>>> 1d8024f74c3020f0dd21744d3a20d11e2420d733
>>>>>>> f0584afadc648281a2a6e51358fa3eaaa6d8861c
>>>>>>> eeabce6e3ceb2ad354ebd2bde4f528a24fc7371f
  }

}
