import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any>{
  canDeactivate() {
    return confirm('return?');
  }
}
