import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupofdocdashComponent } from './groupofdocdash.component';

describe('GroupofdocdashComponent', () => {
  let component: GroupofdocdashComponent;
  let fixture: ComponentFixture<GroupofdocdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupofdocdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupofdocdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
