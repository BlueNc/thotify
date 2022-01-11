import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheDialogComponent } from './cache-dialog.component';

describe('CacheDialogComponent', () => {
  let component: CacheDialogComponent;
  let fixture: ComponentFixture<CacheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
