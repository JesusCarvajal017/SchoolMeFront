import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModuleComponent } from './editar-module.component';

describe('EditarModuleComponent', () => {
  let component: EditarModuleComponent;
  let fixture: ComponentFixture<EditarModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
