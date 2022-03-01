import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChargesMasterComponent } from './home-charges-master.component';

describe('HomeChargesMasterComponent', () => {
  let component: HomeChargesMasterComponent;
  let fixture: ComponentFixture<HomeChargesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChargesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChargesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
