import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsersListComponent } from './get-users-list.component';

describe('GetUsersListComponent', () => {
  let component: GetUsersListComponent;
  let fixture: ComponentFixture<GetUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
