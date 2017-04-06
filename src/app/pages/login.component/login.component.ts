import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  phoneLogin=new PhoneNumLogin(0,0);

  ngOnInit() {
  }

  sendMessage(valid:boolean){

      console.log('click',valid)
  }

}

class PhoneNumLogin {
  constructor(
    private phoneNum:Number,
    private verifyCode:Number
  ){}
}
