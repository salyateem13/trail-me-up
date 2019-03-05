import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleRouteFormComponent } from './circle-route-form.component';

describe('CircleRouteFormComponent', () => {
  let component: CircleRouteFormComponent;
  let fixture: ComponentFixture<CircleRouteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleRouteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
