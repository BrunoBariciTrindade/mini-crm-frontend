import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuporteComponent } from './suporte.component';

describe('SuporteComponent', () => {
  let component: SuporteComponent;
  let fixture: ComponentFixture<SuporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
