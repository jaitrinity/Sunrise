import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmslogComponent } from './smslog.component';

describe('SmslogComponent', () => {
  let component: SmslogComponent;
  let fixture: ComponentFixture<SmslogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmslogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmslogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
