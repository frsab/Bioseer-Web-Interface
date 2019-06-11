import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiledashboardComponent } from './mobiledashboard.component';

describe('MobiledashboardComponent', () => {
  let component: MobiledashboardComponent;
  let fixture: ComponentFixture<MobiledashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobiledashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiledashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
