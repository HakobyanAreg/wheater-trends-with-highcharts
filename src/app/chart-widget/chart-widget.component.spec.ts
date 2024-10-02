import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartWidgetComponent } from './chart-widget.component';
import {mockChartData} from "../shared/test/test.mock";
import {ComponentRef} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('ChartWidgetComponent', () => {
  let component: ChartWidgetComponent;
  let componentRef: ComponentRef<ChartWidgetComponent>
  let fixture: ComponentFixture<ChartWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ChartWidgetComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('chartTitle', 'Test Chart');
    componentRef.setInput('chartDate', ['Jan', 'Feb', 'Mar', 'Apr']);
    componentRef.setInput('chartData', mockChartData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the default chart type as line', () => {
    expect(component.chartTypeControl.value).toBe('line');
    expect(component.chartOptions().chart.type).toBe('line');
  });

  it('should update chart type to bar when selected', async () => {
    const select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    select.click();

    fixture.detectChanges();

    await fixture.whenStable();

    const barOption = fixture.debugElement.query(By.css('mat-option[value="bar"]')).nativeElement;
    barOption.click();
    fixture.detectChanges();

    expect(component.chartTypeControl.value).toBe('bar');
    expect(component.chartOptions().chart.type).toBe('bar');
  });

  it('should have correct series data', () => {
    expect((component.chartOptions().series as Highcharts.SeriesSplineOptions[])[0].data).toEqual(mockChartData.temperature);
    expect((component.chartOptions().series as Highcharts.SeriesSplineOptions[])[1].data).toEqual(mockChartData.humidity);
    expect((component.chartOptions().series as Highcharts.SeriesSplineOptions[])[2].data).toEqual(mockChartData.windSpeed);
  });

  it('should update the chart title correctly', () => {
    componentRef.setInput('chartTitle', 'Updated Chart Title');
    fixture.detectChanges();

    expect(component.chartOptions().title.text).toBe('Updated Chart Title');
  });
});
