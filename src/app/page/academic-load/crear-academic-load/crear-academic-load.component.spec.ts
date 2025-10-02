import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAcademicLoadComponent } from './crear-academic-load.component';

describe('CrearAcademicLoadComponent', () => {
  let component: CrearAcademicLoadComponent;
  let fixture: ComponentFixture<CrearAcademicLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAcademicLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAcademicLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
