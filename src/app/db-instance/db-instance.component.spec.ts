import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbInstanceComponent } from './db-instance.component';

describe('DbInstanceComponent', () => {
  let component: DbInstanceComponent;
  let fixture: ComponentFixture<DbInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
