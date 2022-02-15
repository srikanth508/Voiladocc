import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionpaidReportsComponent } from './subscriptionpaid-reports.component';

describe('SubscriptionpaidReportsComponent', () => {
  let component: SubscriptionpaidReportsComponent;
  let fixture: ComponentFixture<SubscriptionpaidReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionpaidReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionpaidReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
