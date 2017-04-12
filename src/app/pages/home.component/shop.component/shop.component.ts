import {Component, OnInit, Output, EventEmitter} from "@angular/core";


@Component({
  selector:'shop',
  templateUrl:'./shop.component.html',
  styleUrls:['./shop.component.css']
})
export class ShopComponent implements OnInit{
  @Output() hideNav=new EventEmitter();

  ngOnInit(): void {
    this.hideNav.emit();
  }

}
