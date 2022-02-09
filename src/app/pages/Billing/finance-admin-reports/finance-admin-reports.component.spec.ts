import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAdminReportsComponent } from './finance-admin-reports.component';

describe('FinanceAdminReportsComponent', () => {
  let component: FinanceAdminReportsComponent;
  let fixture: ComponentFixture<FinanceAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
