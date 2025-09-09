import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuleComponent } from './crear-module.component';

describe('CrearModuleComponent', () => {
  let component: CrearModuleComponent;
  let fixture: ComponentFixture<CrearModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
