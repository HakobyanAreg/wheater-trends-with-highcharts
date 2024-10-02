import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  afterEach(() => {
    component.chartConfigFormGroup.reset();
    component.chartData.set(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.chartConfigFormGroup).toBeTruthy();
    expect(component.chartConfigFormGroup.controls.regions).toBeDefined();
    expect(component.chartConfigFormGroup.controls.startDate).toBeDefined();
    expect(component.chartConfigFormGroup.controls.endDate).toBeDefined();
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.chartConfigFormGroup.controls.regions.setValue(null);
    component.chartConfigFormGroup.controls.startDate.setValue('');
    component.chartConfigFormGroup.controls.endDate.setValue(null);

    expect(component.chartConfigFormGroup.invalid).toBe(true);
  });
});
