import {ChangeDetectionStrategy, Component, computed, effect, input} from '@angular/core';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";
import {IData} from "../app.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  templateUrl: './chart-widget.component.html',
  imports: [
    HighchartsChartModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidgetComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartTypeControl = new FormControl('line', [Validators.required]);
  chartTitle = input.required<string>();
  chartDate = input.required<string[]>();
  chartData = input.required<IData>();

  chartTypeSignal = toSignal(this.chartTypeControl.valueChanges, {initialValue: 'line'})

  chartOptions = computed(() => ({
      chart: {
        type: this.chartTypeSignal() || 'line',
        backgroundColor: '#f0f0f0'
      },
      title: {
        text: this.chartTitle()
      },
      series: [
        {
          type: this.chartTypeSignal(),
          name: 'Temperature',
          data: this.chartData().temperature,
          color: '#FF8C69'
        },
        {
          type: this.chartTypeSignal(),
          name: 'Humidity',
          data: this.chartData().humidity,
          color: '#8FCB9B'
        },
        {
          type: this.chartTypeSignal(),
          name: 'Wind Speed',
          data: this.chartData().windSpeed,
          color: '#7EC8E3'
        }
      ] as Highcharts.SeriesOptionsType[],
      xAxis: {
        categories: this.chartDate()
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      }
    })
  )
}
