import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminDwService } from '../services/adminDw.service';
import { FormGroup, FormsModule,} from '@angular/forms';
import { EmitObject } from '../../../interfaces/emitobject';

@Component({
  selector: 'app-updateMatch',
  standalone: true,
  imports:[
    FormsModule
  ],
  templateUrl: './updateMatch.component.html',
  styleUrls: ['./updateMatch.component.css']
})
export class UpdateMatchComponent implements OnInit {
  @Output() emmitComponent = new EventEmitter<EmitObject>();
  dataListMatch: any;
  isEdit: boolean = false;
  editIndex!: number;
  updateMatch!: FormGroup;
  constructor(private AdminDwService: AdminDwService) { }

  ngOnInit() {
    this.GetMatches();
  }

  onlyAllowTwoNumbers(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;

    if ((charCode < 48 || charCode > 57) || inputValue.length >= 2) {
      event.preventDefault();
    }
  }
  
  GetMatches(){
    return this.AdminDwService.GetMatches().subscribe((match: any) => {
      this.dataListMatch = match.data;
    });
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.isEdit = true;
  }

  saveEdit(index: number) {
    this.isEdit = false;
    const editedMatch = this.dataListMatch[index];

    const updateMatch = {
      IdMatchDTO: editedMatch.idDTO,
      ScoreTeamADTO: editedMatch.scoreTeamA,
      ScoreTeamBDTO: editedMatch.scoreTeamB,
    }

    this.AdminDwService.UpdateMatches(updateMatch).subscribe((update: any) => {
      if(update.isSucces){
        this.GetMatches();
      }
    })
  }

  disabledMatch(index: number){
    const editedMatch = this.dataListMatch[index];

    const disbledMatch = {
      IdMatchesDTO: editedMatch.idDTO,
    }

    this.AdminDwService.DisabledMatchById(disbledMatch).subscribe((x:any) =>{
      if(x.isSucces){
        this.GetMatches();
      }
    });
  }

  exitComponent(){
    this.emmitComponent.emit({update: false})
  }
}
