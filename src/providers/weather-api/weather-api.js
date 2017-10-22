var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the WeatherApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var WeatherApiProvider = /** @class */ (function () {
    function WeatherApiProvider(http) {
        this.http = http;
        this.apiKey = '54656626f656a67c';
        console.log('Hello WeatherApiProvider Provider');
        //creates the a string that will be bound to the car 'url' to be used to access the weather api
        this.url = 'http://api.wunderground.com/api/' + this.apiKey + '/conditions/q/';
        //creates the a string that will be bound to the car 'urlForcast' to be used to access the weather api
        this.urlForecast = 'http://api.wunderground.com/api/' + this.apiKey + '/forecast/q/';
    }
    //this function takes the api key and city and state variables and puts them in order. Then it takes said information and sends an api request.
    WeatherApiProvider.prototype.getWeather = function (city, state) {
        return this.http.get(this.url + state + '/' + city + '.json')
            .map(function (res) { return res.json(); });
    };
    //this method takes the api key and binds it with a city and state and makes a call for forcast info
    WeatherApiProvider.prototype.getWeatherForecast = function (city, state) {
        return this.http.get(this.urlForecast + state + '/' + city + '.json')
            .map(function (res) { return res.json(); });
    };
    //this function takes the api key and binds it with a zipcode to request currecnt weather information
    WeatherApiProvider.prototype.getWeatherZip = function (zip) {
        return this.http.get(this.url + zip + '.json')
            .map(function (res) { return res.json(); });
    };
    //this function takes the api key and binds it with a zipcode to request weather forcast infomation
    WeatherApiProvider.prototype.getWeatherForecastZip = function (zip) {
        return this.http.get(this.urlForecast + zip + '.json')
            .map(function (res) { return res.json(); });
    };
    //this function takes the api key and binds it with a zipcode to request currecnt weather information
    WeatherApiProvider.prototype.getWeatherGPS = function (lat, long) {
        return this.http.get(this.url + lat + ',' + long + '.json')
            .map(function (res) { return res.json(); });
    };
    //this function takes the api key and binds it with a zipcode to request weather forcast infomation
    WeatherApiProvider.prototype.getWeatherForecastGPS = function (lat, long) {
        return this.http.get(this.urlForecast + lat + ',' + long + '.json')
            .map(function (res) { return res.json(); });
    };
    WeatherApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], WeatherApiProvider);
    return WeatherApiProvider;
}());
export { WeatherApiProvider };
//# sourceMappingURL=weather-api.js.map