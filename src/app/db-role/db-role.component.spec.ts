import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbRoleComponent } from './db-role.component';

describe('DbRoleComponent', () => {
  let component: DbRoleComponent;
  let fixture: ComponentFixture<DbRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
