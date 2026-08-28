import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarLetras } from './agregar-letras';

describe('AgregarLetras', () => {
  let component: AgregarLetras;
  let fixture: ComponentFixture<AgregarLetras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarLetras],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarLetras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
