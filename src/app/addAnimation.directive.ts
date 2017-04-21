import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, Directive, ElementRef, Input,
  OnInit
} from "@angular/core";
@Directive({
  selector:'[addAnimation]'
})
export class AddAnimationDirective implements AfterViewChecked{
  constructor(el:ElementRef){

  }

  @Input('addAnimation') target;

  ngAfterViewChecked(){
    console.log(this.target)
  }
}
