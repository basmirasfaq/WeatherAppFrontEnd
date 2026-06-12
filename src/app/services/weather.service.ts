import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl =
    'http://localhost:8080/weather/current';

  constructor(
    private http: HttpClient
  ) {}

  getWeather(
    city: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${city}`
    );
  }

saveFavourite(city: any) {

  return this.http.post(
    'http://localhost:8080/favorites',
    city
  );
}

getFavourites() {

  return this.http.get(
    'http://localhost:8080/favorites'
  );
}
deleteFavourite(id: number) {

  return this.http.delete(
    `http://localhost:8080/favorites/${id}`
  );
}

getForecast(city: string): Observable<any> {

  return this.http.get(
    `http://localhost:8080/weather/forecast/${city}`
  );
}
getForecastByCoords(lat: number, lon: number) {
  return this.http.get(
    `http://localhost:8080/weather/forecastlocation/${lat}/${lon}`
    
  );
}
}