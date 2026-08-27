import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Repertorio } from './repertorio';

describe('Repertorio', () => {
  let component: Repertorio;
  let fixture: ComponentFixture<Repertorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repertorio],
    }).compileComponents();

    fixture = TestBed.createComponent(Repertorio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
