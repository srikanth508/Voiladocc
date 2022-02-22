import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChargesMasterComponent } from './credit-charges-master.component';

describe('CreditChargesMasterComponent', () => {
  let component: CreditChargesMasterComponent;
  let fixture: ComponentFixture<CreditChargesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditChargesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditChargesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
