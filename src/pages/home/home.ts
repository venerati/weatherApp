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
	location: {
		city:string,
		state:string
	}

  constructor(
  	public navCtrl:NavController, 
  	private WeatherApi:WeatherApiProvider,
  	private storage:Storage
  	) {

  }

  	search(){
  		console.log('zipSearch fired');
  		this.navCtrl.push(SettingsPage);
  	}

  //this will fire when the component is loaded
	ionViewWillEnter(){
		//This grabs the value of 'location' for local storage and hands it to 'val'
		this.storage.get('location').then((val) =>{
			if (val != null) {
				//this takes the val and turns it into a json string
				this.location = JSON.parse(val);
			} else {
				// This is the default location the app will display when the user has not put a value in
				this.location = {
	  			city: 'Dallas',
	  			state: 'TX'
	  			}
			}

		  //this calls the 'getWeather' function and passes the city and state to it. It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
		  	this.WeatherApi.getWeather(this.location.city, this.location.state).subscribe(weather => {
		  		this.weather = weather.current_observation;
		  	});
		});
  	}
}
