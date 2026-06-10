import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  city: string = '';

  @Output()
  citySearch = new EventEmitter<string>();

  searchWeather() {

    this.citySearch.emit(this.city);

  }

}