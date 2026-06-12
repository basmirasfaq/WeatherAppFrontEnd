import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { WeatherService }
from '../../services/weather.service';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-analytics',
  standalone: true,

  imports: [
    CommonModule,
    BaseChartDirective
  ],

  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent
implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) {}

 lineChartData: any = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Temperature °C',

    borderColor: '#38BDF8',
backgroundColor: 'rgba(56,189,248,0.2)',

      fill: true,
      tension: 0.4,

      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#38BDF8',

      pointRadius: 6,
      borderWidth: 4
    }
  ]
};

barChartData: any = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Humidity %',

      backgroundColor: [
        '#06B6D4',
        '#22D3EE',
        '#38BDF8',
        '#60A5FA',
        '#818CF8'
      ],

      borderRadius: 12
    }
  ]
};
chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
        font: {
          size: 13
        }
      }
    }
  },

  scales: {
    x: {
      ticks: {
        color: '#ffffff',
        maxRotation: 45,
        minRotation: 45
      },
      grid: {
        color: 'rgba(255,255,255,0.08)'
      }
    },

    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: 'rgba(255,255,255,0.08)'
      }
    }
  }
};
  ngOnInit() {

    this.loadForecast();

  }

 async loadForecast() {
  try {
    const location = await this.getUserLocation();

    this.weatherService
      .getForecastByCoords(location.lat, location.lon)
      .subscribe((data: any) => {

        const forecastList = data.list.slice(0, 5);

        const labels = forecastList.map((item: any) =>
          item.dt_txt.split(' ')[1].substring(0, 5)
        );

        this.lineChartData = {
          labels,
          datasets: [
            {
              data: forecastList.map((item: any) => item.main.temp),
              label: 'Temperature °C'
            }
          ]
        };

        this.barChartData = {
          labels,
          datasets: [
            {
              data: forecastList.map((item: any) => item.main.humidity),
              label: 'Humidity %'
            }
          ]
        };
      });

  } catch (err) {
    console.error('Location error:', err);

    // fallback (optional)
    // this.weatherService.getForecast('Chennai').subscribe(...);
  }
}
getUserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => reject(error)
    );
  });
}

}