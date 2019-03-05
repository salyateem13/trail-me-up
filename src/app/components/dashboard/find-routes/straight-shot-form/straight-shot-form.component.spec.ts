import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StraightShotFormComponent } from './straight-shot-form.component';

describe('StraightShotFormComponent', () => {
  let component: StraightShotFormComponent;
  let fixture: ComponentFixture<StraightShotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StraightShotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StraightShotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
