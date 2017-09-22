import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


//bring in the weather api provider that will allow us to break out the json information for the user to consume
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	weather:any;
	weatherForecast:any;
	location: {
		city:string,
		state:string,
		zip:string,
		lat:any,
		long:any,
	}

  constructor(
  	public navCtrl:NavController, 
  	private WeatherApi:WeatherApiProvider,
  	private storage:Storage
  	) {

  }
  	// this function is called when the user clicks on the serch icon. It brings the search page up.
  	search(){
  		this.navCtrl.push(SettingsPage);
  	}

    //this will fire when the component is loaded
	ionViewWillEnter(){


		//This grabs the value of 'location' for local storage and hands it to 'val'
		this.storage.get('location').then((val) =>{
			if (val !== null) {
				//this takes the val and turns it into a json string
				this.location = JSON.parse(val);
				console.log(val);

				//if statement to determin if the user has put in a zip or a city
				if (this.location.city != null) {
					console.log('city api has fired')
					//this calls the 'getWeather' function and passes the city and state to it. It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
				  	this.WeatherApi.getWeather(this.location.city, this.location.state).subscribe(weather => {
				  		this.weather = weather.current_observation;
				  	});

				  	console.log(this.weather);

				  	this.WeatherApi.getWeatherForecast(this.location.city, this.location.state).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  	});

				  	console.log(this.weatherForecast);
				//checks to see if zip holds a value, if it does then this fires, if not then gps will fire
				} else if (this.location.zip != null) {
					console.log('the zip api has fired')
					//this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
					this.WeatherApi.getWeatherZip(this.location.zip).subscribe(weather => {
				  		this.weather = weather.current_observation;
				  	});

				  	this.WeatherApi.getWeatherForecastZip(this.location.zip).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  	});

				  	console.log(this.weatherForecast);
				} else {
					console.log('the gps api has fired')
					console.log(this.location.lat, this.location.long)
					//this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
					this.WeatherApi.getWeatherGPS(this.location.lat, this.location.long).subscribe(weather => {
				  		this.weather = weather.current_observation;
				  	});

				  	this.WeatherApi.getWeatherForecastGPS(this.location.lat, this.location.long).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  	});

				  	console.log(this.weatherForecast);

				}

			} else {
				//bring the settings page up for the user to put in location
				this.navCtrl.push(SettingsPage);
			}
		});
  	}
}
