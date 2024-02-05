import { Component, OnInit } from '@angular/core';
import { NavDwComponent } from '../navDw/navDw.component';
import { LoginDwComponent } from "../loginDw/loginDw.component";

@Component({
    selector: 'app-homeDw',
    templateUrl: './homeDw.component.html',
    standalone: true,
    styleUrls: ['./homeDw.component.css'],
    imports: [NavDwComponent, LoginDwComponent]
})
export class HomeDwComponent implements OnInit {
  isloginHome: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
