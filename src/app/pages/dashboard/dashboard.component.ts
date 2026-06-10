import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../layout/sidebar/sidebar.component';

import { NavbarComponent }
from '../../layout/navbar/navbar.component';

import { WeatherService }
from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  weatherData: any;

  constructor(
    private weatherService: WeatherService
  ) {}

  getWeather(city: string) {

    console.log(city);

    this.weatherService
      .getWeather(city)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.weatherData = response;

        },

        error: (error) => {

          console.log(error);

        }

      });

  }

}