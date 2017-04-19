import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

export const ERRORS={
  CAPTCHA_NONE_ERROR:'CAPTCHA_NONE_ERROR',
  AUTH_FAILED:'AUTH_FAILED',
  USER_AUTH_FAIL:'USER_AUTH_FAIL'
}

@Injectable()
export class UserService{
  constructor(private http: Http,) {
  }

  logined = false;
  phoneNum:Number;
  token:any;
  userProfile:any;

  isLogined() {
    return this.http.get('/api/eus/v1/current_user?info_raw={}')
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json())
      })
      .catch(response =>{

      })
  }

  sendMessage(captchaCode,phoneNum: Number) {
    return this.http.post('/api/v4/mobile/verify_code/send', {
      captcha_code: captchaCode,
      mobile: phoneNum,
      scene: 'login',
      type: 'sms'
    })
      .toPromise()
      .then(response => {
        let resp=response.json();
        this.token=resp.validate_token;
        this.phoneNum=phoneNum;
        return Promise.resolve(resp);
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()));
      });

  }

  mobileLogin(code){
    return this.http.post('/api/v1/login/app_mobile',{
      code:code,
      mobile:this.phoneNum,
      validate_token:this.token
    })
      .toPromise()
      .then(response => {
        localStorage.setItem('userId',response.json().user_id)
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()));
      })

  }

  passwordLogin(username,password,captchaCode){
    return this.http.post('/api/v2/login',{
        username:username,
        password:password,
        captcha_code:captchaCode
      })
      .toPromise()
      .then(response => {
        localStorage.setItem('userId',response.json().user_id);
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()));
      })
  }

  requestCaptchaCode(){
    this.http.options('/api/v1/captchas');
    return this.http.post('/api/v1/captchas',{})
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        throw new Error(response.json().message);
      })
  }

  requestOrders(){
    if(!localStorage.getItem('userId')){
      throw new Error();
    }else{
      return this.http.get(`/api/bos/v2/users/${localStorage.getItem('userId')}/orders?limit=10&offset=0`)
        .toPromise()
        .then(response => {
          return Promise.resolve(response.json());
        })
        .catch(response => {
          throw new Error(JSON.stringify(response.json()));
        })
    }
  }

  getUserProfile(){
    return this.http.get(`/api/eus/v1/users/${localStorage.getItem('userId')}`)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        throw new Error(JSON.stringify(response.json()));
      })
  }
}
