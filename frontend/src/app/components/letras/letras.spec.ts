import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Letras } from './letras';

describe('Letras', () => {
  let component: Letras;
  let fixture: ComponentFixture<Letras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Letras],
    }).compileComponents();

    fixture = TestBed.createComponent(Letras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
