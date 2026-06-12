import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
}

];
