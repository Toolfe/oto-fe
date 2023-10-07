import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessPartnersetupComponent } from './business-partner-setup-root.component';


describe('ContactRootComponent', () => {
  let component: BusinessPartnersetupComponent;
  let fixture: ComponentFixture<BusinessPartnersetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnersetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnersetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
