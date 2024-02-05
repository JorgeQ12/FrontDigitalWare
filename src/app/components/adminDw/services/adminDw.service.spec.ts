/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminDwService } from './adminDw.service';

describe('Service: AdminDw', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDwService]
    });
  });

  it('should ...', inject([AdminDwService], (service: AdminDwService) => {
    expect(service).toBeTruthy();
  }));
});
