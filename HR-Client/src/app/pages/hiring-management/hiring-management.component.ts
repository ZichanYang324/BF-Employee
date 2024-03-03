import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css'],
})

export class HiringManagementComponent{

  tab: String = "registration-email";

  constructor( ) {}

  switchTab(tab: String){
    this.tab = tab;
  }
}
