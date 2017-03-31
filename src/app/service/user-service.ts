import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class UserService {
  constructor(
    private http:Http,
  ){}

  isLogined(){
      let logined:boolean;
      this.http.get('/api/v1/user')
        .toPromise()
        .then(response => logined=true)
        .catch(response => logined=false);
    return logined;
  }
}
