import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacionComponent } from './marcacion.component';

describe('MarcacionComponent', () => {
  let component: MarcacionComponent;
  let fixture: ComponentFixture<MarcacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
