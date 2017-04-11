import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{
  constructor(private http: Http,) {
  }

  logined = false;
  phoneNum:Number;
  token:any;
  userProfile:any;

  isLogined() {
    // if(sessionStorage.getItem('userId')){
    //   return true;
    // }else{
    //   return false;
    // }
    // this.http.get('/api/eus/v1/current_user?info_raw={}')
    //   .toPromise()
    //   .then(response => {
    //     console.log(response.json())
    //   })
    //   .catch(response =>{
    //
    //   })
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
        let res=response.json();
        if(res.name=='CAPTCHA_NONE_ERROR'){
          throw new Error(res.name);
        }else{
          throw new Error(res.message);
        }
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
        sessionStorage.setItem('userId',response.json().user_id)
      })
      .catch(response => {
        throw new Error(response.json().message);
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
        sessionStorage.setItem('userId',response.json().user_id);
        // document.cookie='USERID='+response.json().user_id;
      })
      .catch(response => {
        throw new Error(response.json().message)
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
<<<<<<< HEAD
    return this.http.get(`/api/bos/v2/users/${sessionStorage.getItem('userId')}/orders?limit=10&offset=0`)
=======
<<<<<<< HEAD
    return this.http.get(`/api/bos/v2/users/${sessionStorage.getItem('userId')}/orders?limit=10&offset=0`)
=======
    return this.http.get(`/api/bos/v2/users/${this.userProfile.user_id}/orders?limit=10&offset=0`)
>>>>>>> 1d8024f74c3020f0dd21744d3a20d11e2420d733
>>>>>>> f0584afadc648281a2a6e51358fa3eaaa6d8861c
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(response => {
        throw new Error(response.json().message);
      })
  }

  getUserProfile(){
    this.http.get(`/api/eus/v1/users/${sessionStorage.getItem('userId')}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(response => {

      })
  }
}
