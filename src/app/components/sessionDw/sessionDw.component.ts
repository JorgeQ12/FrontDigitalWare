import { Component, OnInit, inject } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Subscription } from 'rxjs';
import { AddSessionComponent } from './addSession/addSession.component';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionGamblingComponent } from './sessionGambling/sessionGambling.component';
import { EmitObject } from '../../interfaces/emitobject';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sessionDw',
  standalone: true,
  imports:[
    AddSessionComponent,
    SessionGamblingComponent,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './sessionDw.component.html',
  styleUrls: ['./sessionDw.component.css']
})
export class SessionDwComponent implements OnInit {
  private messageSubscription: Subscription | undefined;
  modalCreateSession: boolean = false;
  isAddUserSala: boolean = false;
  codeSession!: string;

  constructor(private route: ActivatedRoute,private socketService: SocketService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getParams();
  }

  openModal() {
    this.modalCreateSession = true;
		const modalRef = this.modalService.open(AddSessionComponent, { centered: true, size: 'lg'  });
	}
  
  getParams(){
    this.route.paramMap.subscribe(params => {
      this.codeSession = params.get('id') ?? '';
      this.isAddUserSala = this.codeSession ? true : false;
    });
  }

  addUser(){
    this.isAddUserSala = true
  }


}
