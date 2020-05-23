import { NgModule } from '@angular/core';
import { Component, VERSION } from '@angular/core';
import { IServiceRunner } from './serviceRunner/iServiceRunner';
import { AngularServiceRunner } from './serviceRunner/angularServiceRunner';
import { IService } from './iService';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-service-engine',
  template: ''
})

export class ServiceEngine {
  runner: IServiceRunner;
  constructor(private http: HttpClient) {
  this.runner = new AngularServiceRunner(http);
    }

  request(service: IService) {
    this.runner.run(service);
  }
}

