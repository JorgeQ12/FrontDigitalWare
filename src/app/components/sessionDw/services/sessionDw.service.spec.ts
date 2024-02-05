/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionDwService } from './sessionDw.service';

describe('Service: SessionDw', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionDwService]
    });
  });

  it('should ...', inject([SessionDwService], (service: SessionDwService) => {
    expect(service).toBeTruthy();
  }));
});
