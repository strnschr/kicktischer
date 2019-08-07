import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyDialogComponent } from './ready-dialog.component';

describe('ReadyDialogComponent', () => {
  let component: ReadyDialogComponent;
  let fixture: ComponentFixture<ReadyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
