import { Component, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionDwService } from '../services/sessionDw.service';
import { SocketService } from '../services/socket.service';
import { Subscription, map, switchMap, tap } from 'rxjs';
import { Socketconnection } from '../../../interfaces/socketconnection';
import moment from 'moment';
import swal from 'sweetalert';
@Component({
  selector: 'app-sessionGambling',
  standalone: true,
  imports:[
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './sessionGambling.component.html',
  styleUrls: ['./sessionGambling.component.css']
})
export class SessionGamblingComponent implements OnInit {
  @Input() isAddUserSala: boolean = false;
  @Input() codeSession!: string;
  private messageSubscription: Subscription | undefined;

  personSala!: FormGroup;
  salaId!: string | null;
  isEdit: boolean = false;
  userList: any;
  listWinner: any;
  macthData: any;
  editIndex!: number;
  isDateMaxEdit: boolean = false;
  gamblingShow: boolean = false;
  maxDateMatch: boolean = false;
  codeMatch: any;
  constructor(private socketService: SocketService,private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private SessionDwService: SessionDwService) { }

  ngOnInit() {
    this.sockectConnection();
    this.getParams();
    this.validateForms();
    
  }

  sockectConnection(){
    this.socketService.startConnection();
    this.messageSubscription = this.socketService.messageReceived.subscribe((msg) => {
      this.validateSocket(msg)
    });
  }

  validateSocket(msg: Socketconnection){
    if((msg.user === "AdminMatch" &&  msg.idChange === this.macthData.idMatchDTO )){
      swal("Se Actualizo el partido");
      this.getParams();
    }
    if((msg.user === "UserNew" && this.userList.find((x: any) => x.idSessionDTO === msg.idChange))){
      this.getParams();
      swal("Ingreso un nuevo usuario");
    }
    if((msg.user === "UserUpdate" && this.userList.find((x: any) => x.idSessionDTO === msg.idChange))){
      this.getParams();
      swal("Un usuario actualizo su apuesta");
    }
  }

  validateForms(){
    this.personSala = this.formBuilder.group({
      namePerson: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      personIdentification: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      scoreTeamA: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      scoreTeamB: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
    });
  }
  
  onlyAllowTwoNumbers(event: any, numberLeng: number) {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;

    if ((charCode < 48 || charCode > 57) || inputValue.length >= numberLeng) {
      event.preventDefault();
    }
  }
  
  getParams(){
    this.route.paramMap.subscribe(params => {
      this.salaId = params.get('id');
      this.gamblingShow = this.salaId && !this.isAddUserSala ? true : false;
    });

    this.codeMatch = {
      CodeMatchDTO: this.salaId,
    }

    if(this.gamblingShow){
      this.getMatch().pipe(
        switchMap(dataMatch => {
          return this.getUser().pipe(map(dataUser => [dataMatch, dataUser]));
        })
      ).subscribe(([dataMatch, dataUser]) => {
        if(dataMatch.data.enabledDTO){
          this.macthData = dataMatch.data
          this.validateGamblings(dataUser.data);
          this.validateDateTimeEdit(dataMatch.data)
        }
        else
        {
          this.maxDateMatch = true;
        }
      });
    }
  }
  
  getMatch() {
    return this.SessionDwService.GetMatchByCode(this.codeMatch);
  }
  
  getUser() {
    return this.SessionDwService.GetUserByMatch(this.codeMatch);
  }

  validateDateTimeEdit(data: any){
    this.isDateMaxEdit = this.macthData.dateTimeMatchDTO <= moment().subtract(1, 'minute').format();
    this.maxDateMatch = moment().add(60, 'minute').format() > this.macthData.dateTimeMatchDTO;
    this.listWinner = this.userList.filter((x:any) => x.isWinner);
  }

  validateGamblings(data: any) {
    const teamA = this.macthData.scoreTeamADTO;
    const teamB = this.macthData.scoreTeamBDTO;
    this.userList = data.map((x: any) => {
      if (x.scoreTeamADTO >= teamA && x.scoreTeamBDTO >= teamB) {
        return {
          ...x,
          isWinner: true
        };
      }
      return x;
    }).sort((a: any, b: any) => (b.isWinner ? 1 : -1));
  }
  

  getErrorMessage(controlName: string): string | null {
    const control = this.personSala.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
  
    if (control?.hasError('pattern')) {
      return 'Por favor, digite correctamente el campo.';
    }
  
    return null;
  }


  insertPersonaSala(){

    const dataPerson = {
      PersonNameDTO: this.personSala.controls["namePerson"].value,
      PersonIdentificationDTO: this.personSala.controls["personIdentification"].value,
      SessionCode: this.salaId ?? this.codeSession,
      ScoreTeamADTO: this.personSala.controls["scoreTeamA"].value,
      ScoreTeamBDTO: this.personSala.controls["scoreTeamB"].value,
    }

    this.SessionDwService.InsertSessionPerson(dataPerson).subscribe((person: any) =>{
      this.router.navigate(['/sala/', this.codeSession]);

    })
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.isEdit = true;
  }

  saveEdit(index: number) {
    this.isEdit = false;
    const editedMatch = this.userList[index];
    const updateMatch = {
      IdSessionPersonDTO: editedMatch.idSessionPersonDTO,
      ScoreTeamADTO: editedMatch.scoreTeamADTO,
      ScoreTeamBDTO: editedMatch.scoreTeamBDTO,
    }

    this.SessionDwService.UpdateGamblingByPerson(updateMatch).subscribe();
  }
  
}
