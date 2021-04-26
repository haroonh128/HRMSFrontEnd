import { Component } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  public updateSubscription: Subscription;

  ngOnInit() {
  }

}
