import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuleFormComponent } from './crear-module-form.component';

describe('CrearModuleFormComponent', () => {
  let component: CrearModuleFormComponent;
  let fixture: ComponentFixture<CrearModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearModuleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
