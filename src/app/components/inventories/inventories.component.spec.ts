import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesComponent } from './inventories.component';

describe('InventoriesComponent', () => {
  let component: InventoriesComponent;
  let fixture: ComponentFixture<InventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
