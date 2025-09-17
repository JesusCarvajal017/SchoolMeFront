import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGradeComponent } from './crear-grade.component';

describe('CrearGradeComponent', () => {
  let component: CrearGradeComponent;
  let fixture: ComponentFixture<CrearGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
