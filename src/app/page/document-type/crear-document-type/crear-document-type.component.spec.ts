import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDocumentTypeComponent } from './crear-document-type.component';

describe('CrearDocumentTypeComponent', () => {
  let component: CrearDocumentTypeComponent;
  let fixture: ComponentFixture<CrearDocumentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDocumentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
