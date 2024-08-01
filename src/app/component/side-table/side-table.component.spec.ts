import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTableComponent } from './side-table.component';

describe('SideTableComponent', () => {
  let component: SideTableComponent;
  let fixture: ComponentFixture<SideTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
