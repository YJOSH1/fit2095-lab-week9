import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomsComponent } from './poms.component';

describe('PomsComponent', () => {
  let component: PomsComponent;
  let fixture: ComponentFixture<PomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
