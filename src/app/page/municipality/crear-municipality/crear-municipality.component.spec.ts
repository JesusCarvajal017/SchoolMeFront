import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMunicipalityComponent } from './crear-municipality.component';

describe('CrearMunicipalityComponent', () => {
  let component: CrearMunicipalityComponent;
  let fixture: ComponentFixture<CrearMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMunicipalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
