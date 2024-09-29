import {ChangeDetectionStrategy, Component, computed, effect, input} from '@angular/core';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";
import {IData} from "../app.component";
import {getRandomColor} from "../shared/utils/utils";

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  templateUrl: './chart-widget.component.html',
  imports: [HighchartsChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidgetComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartType = input.required<string>();
  chartTitle = input.required<string>();
  chartDate = input.required<string[]>();
  chartData = input.required<IData>();

  chartOptions = computed(() => ({
      chart: {
        type: this.chartType(),
        backgroundColor: '#f0f0f0'
      },
      title: {
        text: this.chartTitle()
      },
      series: [
        {
          type: this.chartType(),
          name: 'Temperature',
          data: this.chartData().temperature,
          color: getRandomColor()
        },
        {
          type: this.chartType(),
          name: 'Humidity',
          data: this.chartData().humidity,
          color: getRandomColor()
        },
        {
          type: this.chartType(),
          name: 'Wind Speed',
          data: this.chartData().windSpeed,
          color: getRandomColor()
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
