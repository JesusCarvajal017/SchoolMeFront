import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRolFormPermissionComponent } from './crear-rol-form-permission.component';

describe('CrearRolFormPermissionComponent', () => {
  let component: CrearRolFormPermissionComponent;
  let fixture: ComponentFixture<CrearRolFormPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRolFormPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRolFormPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
