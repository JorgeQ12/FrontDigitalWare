import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminDwService } from '../services/adminDw.service';
import {NgbDatepickerModule, NgbTimepickerModule  } from '@ng-bootstrap/ng-bootstrap';
import { MatchesDTO } from '../../../class/matchesDTO';
import { EmitObject } from '../../../interfaces/emitobject';

@Component({
  selector: 'app-addMatch',
  standalone: true,
  templateUrl: './addMatch.component.html',  
  imports: [
    ReactiveFormsModule,
    NgbDatepickerModule, 
    NgbTimepickerModule ,
  
  ],
  styleUrls: ['./addMatch.component.css']
})
export class AddMatchComponent implements OnInit {
  @Output() emmitComponent = new EventEmitter<EmitObject>();
  addMatch!: FormGroup;
  listTeamsA: any;
  listTeamsB: any;
	meridian = true;
  insertMatch!: MatchesDTO;
  date: Date = new Date();
  minDate = {
    year: this.date.getFullYear(),
    month: this.date.getMonth()+1,
    day: this.date.getDate()
  };
  constructor(private formBuilder: FormBuilder, private AdminDwService: AdminDwService ) { }

  ngOnInit() {
    this.validateForms();
    this.GetTeams();
  }
  
  GetTeams(){
    return this.AdminDwService.GetTeams().subscribe((teams: any) => {
      this.listTeamsA = teams.data
    });
  }

  validateForms(){
    this.addMatch = this.formBuilder.group({
      matchA: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      matchB: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      dateTime: ['', [Validators.required]], 
      hourTime: ['', [Validators.required]], 
    });
  }
  
  getErrorMessage(controlName: string): string | null {
    const control = this.addMatch.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
  
    if (control?.hasError('pattern')) {
      return 'Por favor, digite correctamente el campo.';
    }
  
    return null;
  }

  changeData(){
    const { dateTime, hourTime } = this.addMatch.value;
    const fechaCompleta = new Date(dateTime.year, dateTime.month - 1, dateTime.day, hourTime.hour, hourTime.minute, hourTime.second);

    this.insertMatch = {
      IdTeamADTO: this.addMatch.controls["matchA"].value,
      IdTeamBDTO: this.addMatch.controls["matchB"].value,
      DateTimeDTO: fechaCompleta
    };
    
    this.AdminDwService.InsertMatches(this.insertMatch).subscribe((x: any) => {
      this.exitComponent();
    })
  }
  
  deletesSelectedListTeam(e: any){
    this.listTeamsB = this.listTeamsA.filter((x: any) => x.id != e);
  }
  exitComponent(){
    this.emmitComponent.emit({add: false})
  }

}
