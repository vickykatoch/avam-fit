import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapperStatusComponent } from './bootstrapper-status.component';

describe('BootstrapperStatusComponent', () => {
  let component: BootstrapperStatusComponent;
  let fixture: ComponentFixture<BootstrapperStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapperStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
