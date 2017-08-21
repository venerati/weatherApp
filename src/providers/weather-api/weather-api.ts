import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherApiProvider {
	apiKey = '54656626f656a67c';
	url;

  constructor(public http: Http) {
    console.log('Hello WeatherApiProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q/';
  }

  //this function takes the api key and city and state variables and puts them in order. Then it takes said information and sends an api request.
  getWeather(city, state) {
  	return this.http.get(this.url+state+'/'+city+'.json')
  		.map(res => res.json());
  }

  //this function takes the api key and binds it with a zipcode
  getWeatherZip(zip) {
  	return this.http.get(this.url+zip+'.json')
  		.map(res => res.json());
  }

}
