import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecosComponent } from './precos.component';

describe('PrecosComponent', () => {
  let component: PrecosComponent;
  let fixture: ComponentFixture<PrecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
