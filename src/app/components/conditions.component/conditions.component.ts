import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ShoppingService} from "../../service/shopping-service";
@Component({
  selector:'conditions',
  templateUrl:'./conditions.component.html',
  styleUrls:['./conditions.component.css']
})
export class ConditionsComponent {
  constructor(
    private shoppingService:ShoppingService
  ){}

  @Input() title;
  @Output() paramsChanged:EventEmitter<any>=new EventEmitter();

  schema;//左侧列表
  subCategories;//左侧二级
  deliveryMode;//右侧配送方式
  activity;//右侧活动
  sortWayText;

  conditionParams:any={};//url参数

  condition;//控制显示哪一个

  changeSortText(e){
    e.stopPropagation();
    if(e.target.nodeName=='LI'){
      this.sortWayText=e.target.getElementsByTagName('span')[1].innerText;
    }else{
      this.sortWayText=e.target.parentNode.getElementsByTagName('span')[1].innerText;
    }
    this.changeParams(e);
  }

  changeParams(e){
    e.stopPropagation();
    this.condition='';
    this.paramsChanged.emit(this.conditionParams);
  }

  addActivity(id){
    let repeat=false;
    if(!this.conditionParams.activities){
      this.conditionParams.activities=[];
      this.conditionParams.activities.push(id);
    }else{
      for(let i=0; i<this.conditionParams.activities.length; i++){
        if(this.conditionParams.activities[i]==id){
          this.conditionParams.activities.splice(i,1);
          return false;
        }
      }
      if(!repeat){
        this.conditionParams.activities.push(id);
      }
    }
    return true;

  }

  isSelected(id){
    let selected=false;
    if(!this.conditionParams.activities) return;
    for(let i=0; i<this.conditionParams.activities.length; i++){
      if(this.conditionParams.activities[i]==id){
        selected=true;
      }
    }
    return selected;
  }


  getDeliveryMode(){
    if(this.deliveryMode) return;
    this.shoppingService.getDeliveryMode()
      .then(response => {
        this.deliveryMode=response;
      })
  }

  getActivity(){
    if(this.activity) return;
    this.shoppingService.getActivity()
      .then(response => {
        this.activity=response;
      })
  }

  getSchema(){
    // console.log(this.condition);
      if(!this.schema){
        this.shoppingService.getSchema()
          .then(response=> {
            this.schema=response;
            this.getSubCategories(this.schema[1]);
          })
      }
  }

  getSubCategories(menu){
    if(menu.sub_categories){
      this.subCategories=menu.sub_categories;
    }
  }

  stopP(event){
    event.stopPropagation();
  }
}
