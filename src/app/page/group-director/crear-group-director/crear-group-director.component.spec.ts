import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGroupDirectorComponent } from './crear-group-director.component';

describe('CrearGroupDirectorComponent', () => {
  let component: CrearGroupDirectorComponent;
  let fixture: ComponentFixture<CrearGroupDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGroupDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGroupDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
