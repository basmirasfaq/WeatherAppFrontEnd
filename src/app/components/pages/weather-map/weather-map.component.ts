import {
  Component,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import Map from 'ol/Map';
import { OpenlayerMapService } from '../../../openlayer-map.service';
import { WeatherService } from '../../../services/weather.service';



@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent
implements AfterViewInit {

  map!: Map;
  weatherData: any;
  
  constructor(
    private mapService: OpenlayerMapService,
    private weatherService: WeatherService
  ) {}

 ngAfterViewInit() {

  setTimeout(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.map =
          this.mapService.createMap(
            'map',
            lat,
            lon
          );

        this.mapService.addMarker(
          this.map,
          lat,
          lon
        );

        this.weatherService
          .getWeatherByLocation(
            lat,
            lon
          )
          .subscribe((data: any) => {

            this.weatherData = data;

            this.mapService.addWeatherZone(
              this.map,
              lat,
              lon,
              data.main.temp
            );

          });

        setTimeout(() => {

          this.map.updateSize();

        }, 300);

      }
    );

  }, 100);

}

}