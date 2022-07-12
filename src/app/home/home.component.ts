import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bgImageVariable="assets/images/hero_1.jpg";
  constructor() { }

  ngOnInit(): void {
   
  }

}
