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
    this.url = 'http://api.wunderground.com/api/'+ this.apiKey +'/conditions/q/';
  }

  getWeather(state, city) {
  	return this.http.get(this.url+state+city)
  }

}
