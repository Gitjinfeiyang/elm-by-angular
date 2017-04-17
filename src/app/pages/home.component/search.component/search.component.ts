import {Component, HostBinding, OnInit} from '@angular/core';
import {routerAnimation} from "../../../animations";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations:[routerAnimation]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation=true;
  @HostBinding('style.display') display="block";

  constructor() { }

  ngOnInit() {
  }

}
