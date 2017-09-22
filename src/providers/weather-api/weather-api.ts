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
  urlForecast;

  constructor(public http: Http) {
    console.log('Hello WeatherApiProvider Provider');
    //creates the a string that will be bound to the car 'url' to be used to access the weather api
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q/';

    //creates the a string that will be bound to the car 'urlForcast' to be used to access the weather api
    this.urlForecast = 'http://api.wunderground.com/api/'+this.apiKey+'/forecast/q/';
  }

  //this function takes the api key and city and state variables and puts them in order. Then it takes said information and sends an api request.
  getWeather(city, state) {
  	return this.http.get(this.url+state+'/'+city+'.json')
  		.map(res => res.json());
  }

  //this method takes the api key and binds it with a city and state and makes a call for forcast info
  getWeatherForecast(city, state) {
    return this.http.get(this.urlForecast+state+'/'+city+'.json')
      .map(res => res.json());
  }

  //this function takes the api key and binds it with a zipcode to request currecnt weather information
  getWeatherZip(zip) {
  	return this.http.get(this.url+zip+'.json')
  		.map(res => res.json());
  }

  //this function takes the api key and binds it with a zipcode to request weather forcast infomation
  getWeatherForecastZip(zip) {
    return this.http.get(this.urlForecast+zip+'.json')
      .map(res => res.json());
  }

    //this function takes the api key and binds it with a zipcode to request currecnt weather information
  getWeatherGPS(lat, long) {
    return this.http.get(this.url+lat+','+long+'.json')
      .map(res => res.json());
  }

  //this function takes the api key and binds it with a zipcode to request weather forcast infomation
  getWeatherForecastGPS(lat,long) {
    return this.http.get(this.urlForecast+lat+','+long+'.json')
      .map(res => res.json());
  }





}
