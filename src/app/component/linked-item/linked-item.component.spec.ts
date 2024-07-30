import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedItemComponent } from './linked-item.component';

describe('LinkedItemComponent', () => {
  let component: LinkedItemComponent;
  let fixture: ComponentFixture<LinkedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
