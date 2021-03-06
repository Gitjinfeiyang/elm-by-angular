import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShoppingService} from "../../service/shopping-service";
import {CityService} from "../../service/city-service";
import {routerAnimation} from "../../animations";
@Component({
  selector:'main-page',
  template:`
<router-outlet (activate)="hideNav($event)"></router-outlet>
<nav-footer *ngIf="showNav"></nav-footer>
`,
  styles:[],
})
export  class MainComponent implements OnInit{

  constructor(
    private router:Router,
  ){}

  showNav=true;

  ngOnInit(){

    console.log('maincomponent init')
  }

  hideNav(e){
    if(e.hideNav){
      this.showNav=false;
    }else{
      this.showNav=true;
    }
  }
}
