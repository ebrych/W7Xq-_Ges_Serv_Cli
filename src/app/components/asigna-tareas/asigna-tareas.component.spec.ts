import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaTareasComponent } from './asigna-tareas.component';

describe('AsignaTareasComponent', () => {
  let component: AsignaTareasComponent;
  let fixture: ComponentFixture<AsignaTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
