import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//bring in the weather api provider that will allow us to break out the json information for the user to consume
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private WeatherApiProvider:WeatherApiProvider) {

  }

}
