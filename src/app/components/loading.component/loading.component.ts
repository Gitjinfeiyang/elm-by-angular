import {Component, Input, AfterContentChecked, Output, EventEmitter} from "@angular/core";
import {fadeInUp} from "../../animations";
@Component({
  selector:'loading',
  templateUrl:'./loading.component.html',
  styleUrls:['loading.component.css'],
  animations:[fadeInUp]
})
export class LoadingComponent implements AfterContentChecked{
  @Input() complete;
  @Output() animationEnd:EventEmitter<boolean>;

  ngAfterContentChecked(): void {
  }
}
