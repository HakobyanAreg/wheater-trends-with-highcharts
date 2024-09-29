import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ChartWidgetComponent} from "./chart-widget/chart-widget.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {generateDaysRange, getRandomChartType, regions} from "./shared/utils/utils";
import {getWeatherData} from "./api/api";

export interface IWeatherData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    relative_humidity_2m_mean: number[];
    wind_speed_10m_max: number[];
  }
  daily_units: {
    time: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    relative_humidity_2m_mean: string,
    wind_speed_10m_max: string;
  }
  elevation: number;
  generationtime_ms: number
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

interface IChartConfigFormGroup {
  regions: FormControl<IRegion[] | null>;
  startDate: FormControl<Date | string | null>;
  endDate: FormControl<Date | string | null>;
}

interface ILocation {
  longitude: number;
  latitude: number;
}

export interface IRegion {
  id: number;
  name: string;
  location: ILocation;
}

export interface IData {
  temperature: number[];
  humidity: number[];
  windSpeed: number[];
}

interface IChartData {
  type: string;
  title: string;
  location: ILocation;
  date: string[];
  data: IData;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ChartWidgetComponent,
    MatButton,
    ButtonComponent
  ],
  templateUrl: './app.component.html',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class AppComponent {

  protected readonly regions = regions;
  datePipe = inject(DatePipe);
  chartData = signal<IChartData[] | null>(null);

  readonly chartConfigFormGroup: FormGroup<IChartConfigFormGroup> = new FormGroup<IChartConfigFormGroup>({
    regions: new FormControl<IRegion[] | null>(null, Validators.required),
    startDate: new FormControl<Date | string>('', Validators.required),
    endDate: new FormControl<Date | string>('', Validators.required),
  });

  async updateCharts() {
    if (!this.chartConfigFormGroup.dirty) {
      return
    }

    this.chartConfigFormGroup.reset(this.chartConfigFormGroup.getRawValue());

    const startDate = this.chartConfigFormGroup.controls.startDate.value;
    const endDate = this.chartConfigFormGroup.controls.endDate.value;
    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    const selectedRegions = this.chartConfigFormGroup.controls.regions.value;

    const chartDataConfig = selectedRegions?.map(region => ({
      type: getRandomChartType(),
      title: region.name,
      date: generateDaysRange(formattedStartDate || '', formattedEndDate || ''),
      data: {} as IData,
      location: {
        longitude: region.location.longitude,
        latitude: region.location.latitude
      }
    })) || [];

    const queryParams = selectedRegions?.map(region =>
      `longitude=${region.location.longitude}&latitude=${region.location.latitude}`
    ).join('&') || '';

    const url = `timezone=Europe/Berlin&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,wind_speed_10m_max&${queryParams}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

    const weatherData = await getWeatherData(url);

    const updatedChartData = chartDataConfig.map(chart => {
      const weatherForLocation = weatherData.find(w =>
        Math.floor(chart.location.longitude) === Math.floor(w.longitude) &&
        Math.floor(chart.location.latitude) === Math.floor(w.latitude)
      );

      if (weatherForLocation) {
        chart.data.temperature = weatherForLocation.daily.temperature_2m_max;
        chart.data.humidity = weatherForLocation.daily.relative_humidity_2m_mean;
        chart.data.windSpeed = weatherForLocation.daily.wind_speed_10m_max;
      }

      return chart;
    });
    this.chartData.set(updatedChartData);
  }
}
