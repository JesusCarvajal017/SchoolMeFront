import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPermissionComponent } from './crear-permission.component';

describe('CrearPermissionComponent', () => {
  let component: CrearPermissionComponent;
  let fixture: ComponentFixture<CrearPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
