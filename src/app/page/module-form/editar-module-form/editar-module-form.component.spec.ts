import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModuleFormComponent } from './editar-module-form.component';

describe('EditarModuleFormComponent', () => {
  let component: EditarModuleFormComponent;
  let fixture: ComponentFixture<EditarModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarModuleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
