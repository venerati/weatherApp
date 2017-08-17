import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//bring in the weather api provider that will allow us to break out the json information for the user to consume
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	weather:any;
	location: {
		city:string,
		state:string
	}

  constructor(public navCtrl: NavController, private WeatherApi:WeatherApiProvider) {

  }

  //this will fire when the component is loaded
	ionViewWillEnter(){
  		this.location = {
  			city: 'Dallas',
  			state: 'TX'
  		}
  //this calls the 'getWeather' function and passes the city and state to it. It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
  	this.WeatherApi.getWeather(this.location.city, this.location.state).subscribe(weather => {
  		this.weather = weather.current_observation;
  	});
  }

}
