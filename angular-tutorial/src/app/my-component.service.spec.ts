import { TestBed } from '@angular/core/testing';

import { MyComponentService } from './my-component.service';

describe('MyComponentService', () => {
  let service: MyComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
