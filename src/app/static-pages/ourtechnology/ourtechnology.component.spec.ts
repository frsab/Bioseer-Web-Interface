import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurtechnologyComponent } from './ourtechnology.component';

describe('OurtechnologyComponent', () => {
  let component: OurtechnologyComponent;
  let fixture: ComponentFixture<OurtechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurtechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurtechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
