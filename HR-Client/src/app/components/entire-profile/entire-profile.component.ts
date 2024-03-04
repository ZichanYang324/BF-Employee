import { Profile } from './profiles.types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entire-profile',
  templateUrl: './entire-profile.component.html',
  styleUrls: ['./entire-profile.component.scss'],
})
export class EntireProfileComponent implements OnInit {
  @Input() profile?: Profile;

  constructor() {}

  ngOnInit(): void {}
}
