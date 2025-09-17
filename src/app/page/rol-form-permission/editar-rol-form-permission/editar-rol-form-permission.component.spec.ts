import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolFormPermissionComponent } from './editar-rol-form-permission.component';

describe('EditarRolFormPermissionComponent', () => {
  let component: EditarRolFormPermissionComponent;
  let fixture: ComponentFixture<EditarRolFormPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolFormPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRolFormPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
