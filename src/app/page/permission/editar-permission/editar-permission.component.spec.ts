import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermissionComponent } from './editar-permission.component';

describe('EditarPermissionComponent', () => {
  let component: EditarPermissionComponent;
  let fixture: ComponentFixture<EditarPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
