import { Routes } from '@angular/router';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WeatherMapComponent } from './components/pages/weather-map/weather-map.component';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
  path: 'favourite',
  component: FavouriteComponent
},
{
  path: 'analytics',
  loadComponent: () =>
    import('./components/analytics/analytics.component')
      .then(m => m.AnalyticsComponent)
},
 {
    path: 'weather-map',
    component: WeatherMapComponent
  }

];
