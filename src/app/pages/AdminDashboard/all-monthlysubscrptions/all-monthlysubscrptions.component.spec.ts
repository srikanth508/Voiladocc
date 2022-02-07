import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonthlysubscrptionsComponent } from './all-monthlysubscrptions.component';

describe('AllMonthlysubscrptionsComponent', () => {
  let component: AllMonthlysubscrptionsComponent;
  let fixture: ComponentFixture<AllMonthlysubscrptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMonthlysubscrptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMonthlysubscrptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
