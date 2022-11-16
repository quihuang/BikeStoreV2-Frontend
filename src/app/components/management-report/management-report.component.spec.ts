import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementReportComponent } from './management-report.component';

describe('ManagementReportComponent', () => {
  let component: ManagementReportComponent;
  let fixture: ComponentFixture<ManagementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
