var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
//bring in the weather api provider that will allow us to break out the json information for the user to consume
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { SettingsPage } from '../settings/settings';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, WeatherApi, storage) {
        this.navCtrl = navCtrl;
        this.WeatherApi = WeatherApi;
        this.storage = storage;
    }
    // this function takes the current weather tempature and removes any decimal point
    HomePage.prototype.mainTempFunc = function () {
        this.mainTemp = this.weather.temp_f.toFixed(0);
        console.log("maintempfunc has fired");
        console.log(this.mainTemp);
    };
    HomePage.prototype.forecastChart = function () {
        var dayOne = this.weatherForecast.simpleforecast.forecastday[0].date.weekday.substring(0, 3);
        var dayTwo = this.weatherForecast.simpleforecast.forecastday[1].date.weekday.substring(0, 3);
        var dayThree = this.weatherForecast.simpleforecast.forecastday[2].date.weekday.substring(0, 3);
        var dayFour = this.weatherForecast.simpleforecast.forecastday[3].date.weekday.substring(0, 3);
        var highDayOne = this.weatherForecast.simpleforecast.forecastday[0].high.fahrenheit;
        var highDaytwo = this.weatherForecast.simpleforecast.forecastday[1].high.fahrenheit;
        var highDayThree = this.weatherForecast.simpleforecast.forecastday[2].high.fahrenheit;
        var highDayFour = this.weatherForecast.simpleforecast.forecastday[3].high.fahrenheit;
        // dayOne = dayOne.substring(0,3);
        // dayTwo = dayTwo.substring(0,3);
        // dayThree = dayThree.substring(0,3);
        // dayFour = dayFour.substring(0,3);
        this.foreChart = new Chart(this.forecastCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: [dayOne, dayTwo, dayThree, dayFour],
                datasets: [
                    {
                        label: "High",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.5,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [highDayOne, highDaytwo, highDayThree, highDayFour],
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    HomePage.prototype.dataCall = function () {
        var _this = this;
        //This grabs the value of 'location' for local storage and hands it to 'val'
        this.storage.get('location').then(function (val) {
            if (val !== null) {
                //this takes the val and turns it into a json string
                _this.location = JSON.parse(val);
                console.log(val);
                //if statement to determin if the user has put in a zip or a city
                if (_this.location.city != null) {
                    console.log('city api has fired');
                    //this calls the 'getWeather' function and passes the city and state to it. It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
                    _this.WeatherApi.getWeather(_this.location.city, _this.location.state).subscribe(function (weather) {
                        _this.weather = weather.current_observation;
                        _this.mainTempFunc();
                    });
                    console.log(_this.weather);
                    _this.WeatherApi.getWeatherForecast(_this.location.city, _this.location.state).subscribe(function (weatherForecast) {
                        _this.weatherForecast = weatherForecast.forecast;
                        _this.forecastChart();
                    });
                    console.log(_this.weatherForecast);
                    //checks to see if zip holds a value, if it does then this fires, if not then gps will fire
                }
                else if (_this.location.zip != null) {
                    console.log('the zip api has fired');
                    //this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
                    _this.WeatherApi.getWeatherZip(_this.location.zip).subscribe(function (weather) {
                        _this.weather = weather.current_observation;
                        _this.mainTempFunc();
                    });
                    _this.WeatherApi.getWeatherForecastZip(_this.location.zip).subscribe(function (weatherForecast) {
                        _this.weatherForecast = weatherForecast.forecast;
                        _this.forecastChart();
                    });
                    console.log(_this.weatherForecast);
                }
                else {
                    console.log('the gps api has fired');
                    console.log(_this.location.lat, _this.location.long);
                    //this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
                    _this.WeatherApi.getWeatherGPS(_this.location.lat, _this.location.long).subscribe(function (weather) {
                        _this.weather = weather.current_observation;
                        _this.mainTempFunc();
                    });
                    _this.WeatherApi.getWeatherForecastGPS(_this.location.lat, _this.location.long).subscribe(function (weatherForecast) {
                        _this.weatherForecast = weatherForecast.forecast;
                        _this.forecastChart();
                    });
                    console.log(_this.weatherForecast);
                }
            }
            else {
                //bring the settings page up for the user to put in location
                _this.navCtrl.push(SettingsPage);
            }
        });
    };
    // this function is called when the user clicks on the serch icon. It brings the search page up.
    HomePage.prototype.search = function () {
        this.navCtrl.push(SettingsPage);
    };
    //this is called by a button on the home.html file and it updated the api call
    HomePage.prototype.refresh = function () {
        console.log("refresh has fired");
        this.dataCall();
    };
    //this will fire when the component is loaded
    HomePage.prototype.ionViewWillEnter = function () {
        this.dataCall();
    };
    __decorate([
        ViewChild('forecastCanvas'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "forecastCanvas", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            WeatherApiProvider,
            Storage])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map