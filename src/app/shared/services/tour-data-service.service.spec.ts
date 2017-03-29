import { TestBed, inject } from '@angular/core/testing';

import { TourDataServiceService } from './tour-data-service.service';

describe('TourDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourDataServiceService]
    });
  });

  it('should ...', inject([TourDataServiceService], (service: TourDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
