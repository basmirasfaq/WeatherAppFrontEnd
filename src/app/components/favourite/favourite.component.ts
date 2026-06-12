import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
 
  city = '';
  favouriteCities: any[] = [];

  constructor(
    private weatherService: WeatherService
  ) {}
ngOnInit() {

  this.weatherService
    .getFavourites()
    .subscribe((data: any) => {

      data.forEach((cityObj: any) => {

        this.weatherService
          .getWeather(cityObj.city)
          .subscribe((weatherData: any) => {

            this.favouriteCities.push({
              ...weatherData,
              id: cityObj.id
            });

          });
      });
    });

}
addFavourite() {

  if (!this.city.trim()) return;

  const cityName = this.city.trim();

 this.weatherService
  .saveFavourite({
    city: cityName
  })
  .subscribe({

    next: (savedCity: any) => {

      this.weatherService
        .getWeather(cityName)
        .subscribe({

          next: (weatherData: any) => {

            this.favouriteCities.push({
              ...weatherData,
              id: savedCity.id
            });

            this.city = '';
          }
        });
    },

    error: (err) => {

      console.log(err);
    }
  });
}
removeFavourite(index: number) {

  const city = this.favouriteCities[index];

  this.weatherService
    .deleteFavourite(city.id)
    .subscribe(() => {

      this.favouriteCities.splice(index, 1);

    });
}
}