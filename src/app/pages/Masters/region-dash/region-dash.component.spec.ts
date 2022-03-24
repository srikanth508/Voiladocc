import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDashComponent } from './region-dash.component';

describe('RegionDashComponent', () => {
  let component: RegionDashComponent;
  let fixture: ComponentFixture<RegionDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
