import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEpsComponent } from './crear-eps.component';

describe('CrearEpsComponent', () => {
  let component: CrearEpsComponent;
  let fixture: ComponentFixture<CrearEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
