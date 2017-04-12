import {Component, Input, OnInit} from "@angular/core";


const ratingClass=['#icon-pingfenwujiaoxing1','#icon-xing','#icon-pingfenwujiaoxing'];//0，1，0.5


@Component({
  selector:'rating',
  templateUrl:'./rating.component.html',
  styleUrls:['./rating.component.css']
})
export class RatingComponent implements  OnInit{
  ngOnInit(): void {
    this.initRatings();
  }
  @Input() rating=0;

  ratings:Array<String> = [];

  initRatings(){
    if(this.rating<0.5){
      this.ratings=[ratingClass[0],ratingClass[0],ratingClass[0],ratingClass[0],ratingClass[0]];
    }else if(this.rating<=1){
      this.ratings=[ratingClass[2],ratingClass[0],ratingClass[0],ratingClass[0],ratingClass[0]];
    }else{
      let integer=parseInt(this.rating+'');
      let decimal=this.rating-integer;
      for(let i=1;i<=integer;i++){
        this.ratings.push(ratingClass[1]);
      }
      if(decimal<0.5){
        for(let i=integer+1;i<=5;i++){
          this.ratings.push(ratingClass[0]);
        }
      }else{
        this.ratings.push(ratingClass[2]);
        for(let i=integer+2;i<=5;i++){
          this.ratings.push(ratingClass[0]);
        }
      }
    }
  }
}
