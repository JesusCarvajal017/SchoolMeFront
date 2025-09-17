import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGroupComponent } from './editar-group.component';

describe('EditarGroupComponent', () => {
  let component: EditarGroupComponent;
  let fixture: ComponentFixture<EditarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
