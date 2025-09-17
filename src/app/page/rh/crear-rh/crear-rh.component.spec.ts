import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRhComponent } from './crear-rh.component';

describe('CrearRhComponent', () => {
  let component: CrearRhComponent;
  let fixture: ComponentFixture<CrearRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
