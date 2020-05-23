import { Component, OnInit } from '@angular/core';
// httpClient
import { ServiceEngine } from '../serviceEngine/serviceEngine';
import { IWebServiceListener } from '../serviceEngine/iWebServiceListener';
import { GqlService } from '../api/gqlService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private engine: ServiceEngine) {
  }

  ngOnInit() {
    this.getUserInfo();
}

getUserInfo() {
  const _this = this;
  const listener = new (class ServiceListener implements IWebServiceListener {
      onRequestSuccess(entity: any) {
          const data = entity;
          console.log('123', data);
      }
      onRequestFail(code: number) {
          console.log('listener fail:' + code);
      }
  })();
  const service = new GqlService(listener);
  _this.engine.request(service);
}
}
