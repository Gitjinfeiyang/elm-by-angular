import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingService} from "../../../service/shopping-service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private shoppingService:ShoppingService
  ) { }

  categoryList;
  offset=0;
  title;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.title=params['id'];
        this.shoppingService.getCategoryList(this.offset,params['id'])
          .then(response => {
            this.categoryList=response;
          })
          .catch(response => {

          })
      })
  }

}
