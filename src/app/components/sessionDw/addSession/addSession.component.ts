import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminDwService } from '../../adminDw/services/adminDw.service';
import { SessionDwService } from '../services/sessionDw.service';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addSession',
  standalone:true,
  imports:[
    ReactiveFormsModule
  ],
  templateUrl: './addSession.component.html',
  styleUrls: ['./addSession.component.css']
})

export class AddSessionComponent implements OnInit {
  @Output() emmitComponent = new EventEmitter<any>();

  dataListMatch: any;
  isValidateDate: boolean = false;
  addSala!: FormGroup;
  constructor(private AdminDwService: AdminDwService, private formBuilder: FormBuilder, private SessionDwService: SessionDwService, private router: Router, public activeModal: NgbActiveModal  ) { }

  ngOnInit() {
    this.validateForms();
    this.GetMatches();
  }

  validateForms(){
    this.addSala = this.formBuilder.group({
      sessionName: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      idMatches: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
    });
  }
  
  getErrorMessage(controlName: string, validateHour?: boolean): string | null {
    const control = this.addSala.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
  
    if (control?.hasError('pattern')) {
      return 'Por favor, digite correctamente el campo.';
    }

    if(validateHour){
      const valueDate = this.dataListMatch.find((x:any) => x.idDTO == control?.value )
      this.isValidateDate = valueDate.dateTime <= moment().subtract(5 ,'minute').format();
      return this.isValidateDate ? 'No se permite mas apuestas al partido seleccionado' : null
    }
  
    return null;
  }

  GetMatches() {
    return this.AdminDwService.GetMatches().subscribe((matches: any) => {
      this.dataListMatch = matches.data.map((matchItem: any) => {
        return {
          ...matchItem,
          descriptionMatch: matchItem.nameTemaADTO + " Vs " + matchItem.nameTemaBDTO + " " + moment(matchItem.dateTime).format('lll'),
        };
      });
    });
  }

  insertDataSala(){
    const dataSala = {
      IdMatchesDTO: this.addSala.controls["idMatches"].value,
      SessionNameDTO: this.addSala.controls["sessionName"].value,
    }

    this.SessionDwService.InsertSessionMatches(dataSala).subscribe((update: any) => {
      if(update.isSucces){
        this.activeModal.close();
        this.router.navigate(['/gambling/', update.message]);
      }
    })
  }
}
