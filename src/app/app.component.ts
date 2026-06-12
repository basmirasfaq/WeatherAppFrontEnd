import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-frontend';
}
