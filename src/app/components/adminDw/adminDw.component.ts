import { Component, OnInit } from '@angular/core';
import { AddMatchComponent } from './addMatch/addMatch.component';
import { UpdateMatchComponent } from './updateMatch/updateMatch.component';
import { EmitObject } from '../../interfaces/emitobject';

@Component({
  selector: 'app-adminDw',
  templateUrl: './adminDw.component.html',
  standalone: true,  
  imports: [
    AddMatchComponent,
    UpdateMatchComponent
  ],
  styleUrls: ['./adminDw.component.css']
})
export class AdminDwComponent implements OnInit {
  isAddMatch: boolean = false;
  isUpdateMatch: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  emmitComponent(e: EmitObject){
    if(!e.update){
      this.isUpdateMatch = false;
    }
    if(!e.add){
      this.isAddMatch = false;
    }
  }
}
