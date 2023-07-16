import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedDocumentsComponent } from './applied-documents.component';

describe('AppliedDocumentsComponent', () => {
  let component: AppliedDocumentsComponent;
  let fixture: ComponentFixture<AppliedDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedDocumentsComponent]
    });
    fixture = TestBed.createComponent(AppliedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
