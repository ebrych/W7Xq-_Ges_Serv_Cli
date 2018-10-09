import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLocalComponent } from './repo-local.component';

describe('RepoLocalComponent', () => {
  let component: RepoLocalComponent;
  let fixture: ComponentFixture<RepoLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
