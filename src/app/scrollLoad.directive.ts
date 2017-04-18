import {AfterViewChecked, Directive, ElementRef, HostListener, Input} from "@angular/core";
import {debounce} from "./service/shopping-service";
@Directive({
  selector:'[scrollLoad]'
})
export class ScrollLoadDirective implements AfterViewChecked{
  constructor(el:ElementRef){
    this.el=el.nativeElement;
  }

  el;
  pageH;
  offsetH;

  ngAfterViewChecked(): void {
    this.pageH=this.el.scrollHeight;
    this.offsetH=this.el.offsetHeight;
  }

  @Input('scrollLoad') scrollFn:Function;

  @HostListener('scroll') scrollLoad(){
    debounce(() => {
      if(this.el.scrollTop+this.offsetH>this.pageH-20){
        this.scrollFn();
      }
    });
  }
}
