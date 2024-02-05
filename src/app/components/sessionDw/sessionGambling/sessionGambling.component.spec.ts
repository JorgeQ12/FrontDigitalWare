/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionGamblingComponent } from './sessionGambling.component';

describe('SessionGamblingComponent', () => {
  let component: SessionGamblingComponent;
  let fixture: ComponentFixture<SessionGamblingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionGamblingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionGamblingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
