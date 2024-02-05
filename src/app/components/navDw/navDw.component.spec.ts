/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavDwComponent } from './navDw.component';

describe('NavDwComponent', () => {
  let component: NavDwComponent;
  let fixture: ComponentFixture<NavDwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
