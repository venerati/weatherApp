import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';


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
	mainTemp:any;

	@ViewChild('forecastCanvas') forecastCanvas;

	foreChart: any;

  constructor(
  	public navCtrl:NavController, 
  	private WeatherApi:WeatherApiProvider,
  	private storage:Storage
  	) {

  }

    	// this function takes the current weather tempature and removes any decimal point
	mainTempFunc(){

		this.mainTemp = this.weather.temp_f.toFixed(0);
		console.log("maintempfunc has fired");
		console.log(this.mainTemp);
	}

	forecastChart(){

		 var dayOne = this.weatherForecast.simpleforecast.forecastday[0].date.weekday.substring(0,3);
		 var dayTwo = this.weatherForecast.simpleforecast.forecastday[1].date.weekday.substring(0,3);
		 var dayThree = this.weatherForecast.simpleforecast.forecastday[2].date.weekday.substring(0,3);
		 var dayFour = this.weatherForecast.simpleforecast.forecastday[3].date.weekday.substring(0,3);

		 var highDayOne = this.weatherForecast.simpleforecast.forecastday[0].high.fahrenheit;
		 var highDaytwo = this.weatherForecast.simpleforecast.forecastday[1].high.fahrenheit;
		 var highDayThree = this.weatherForecast.simpleforecast.forecastday[2].high.fahrenheit;
		 var highDayFour = this.weatherForecast.simpleforecast.forecastday[3].high.fahrenheit;

		 var lowDayOne = this.weatherForecast.simpleforecast.forecastday[0].low.fahrenheit;
		 var lowDayTwo = this.weatherForecast.simpleforecast.forecastday[1].low.fahrenheit;
		 var lowDayThree = this.weatherForecast.simpleforecast.forecastday[2].low.fahrenheit;
		 var lowDayFour = this.weatherForecast.simpleforecast.forecastday[3].low.fahrenheit;

		 var precipDayOne = this.weatherForecast.simpleforecast.forecastday[0].pop;
		 var precipDayTwo = this.weatherForecast.simpleforecast.forecastday[1].pop;
		 var precipDayThree = this.weatherForecast.simpleforecast.forecastday[2].pop;
		 var precipDayFour = this.weatherForecast.simpleforecast.forecastday[3].pop;

		this.foreChart = new Chart(this.forecastCanvas.nativeElement, {

			type: 'line',
			data: {
				labels: [ dayOne,, dayTwo,, dayThree,, dayFour,,],
				datasets: [
					{
						label: "Temp",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#fcdd16",
                        borderColor: "#f4e242",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.5,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#fcdd16",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#fcdd16",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [highDayOne,lowDayOne, highDaytwo,lowDayTwo, highDayThree,lowDayThree, highDayFour,lowDayFour],
                        spanGaps: false,
					},
					{
						label: "Precipitation",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#3239ff",
                        borderColor: "#44b4ff",
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
                        data: [precipDayOne,, precipDayTwo,, precipDayThree,, precipDayFour,,],
                        spanGaps: true,
					}
				]
			},
			options: {
				scales: {
					yAxes:[{
						ticks:{
							beginAtZero: true,
							// suggestedMax: 100,
							// suggestedMin: -10,
							stepSize: 10,
						}
					}]
				},

				layout: {
					padding:{
						left: 10,
						right:25,
						top: 0,
						bottomt: 0
					}
				},
				elements: {
					tension: 1,
					fill: 'bottom',
					backgroundColor: '#111111',
				},
				legend: {
					display: true,
					lables:{
						boxWidth: 10,
						fontColor: '#fff'
					}
				}
			}
		})
  	}


  	dataCall(){
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
				  		this.mainTempFunc();
				  	});

				  	console.log(this.weather);

				  	this.WeatherApi.getWeatherForecast(this.location.city, this.location.state).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  		this.forecastChart();
				  	});

				  	console.log(this.weatherForecast);
				//checks to see if zip holds a value, if it does then this fires, if not then gps will fire
				} else if (this.location.zip != null) {
					console.log('the zip api has fired')
					//this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
					this.WeatherApi.getWeatherZip(this.location.zip).subscribe(weather => {
				  		this.weather = weather.current_observation;
				  		this.mainTempFunc();
				  	});

				  	this.WeatherApi.getWeatherForecastZip(this.location.zip).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  		this.forecastChart();
				  	});

				  	console.log(this.weatherForecast);
				} else {
					console.log('the gps api has fired')
					console.log(this.location.lat, this.location.long)
					//this calls the 'getWeatherZip' funtion and passes the zip into the api call.It this subscribes to the observable and we call it weather. This returns the json object that the API hands back.
					this.WeatherApi.getWeatherGPS(this.location.lat, this.location.long).subscribe(weather => {
				  		this.weather = weather.current_observation;
				  		this.mainTempFunc();
				  	});

				  	this.WeatherApi.getWeatherForecastGPS(this.location.lat, this.location.long).subscribe(weatherForecast => {
				  		this.weatherForecast = weatherForecast.forecast;
				  		this.forecastChart();
				  	});

				  	console.log(this.weatherForecast);

				}

			} else {
				//bring the settings page up for the user to put in location
				this.navCtrl.push(SettingsPage);
			}
		});
  	}

  	// this function is called when the user clicks on the serch icon. It brings the search page up.
  	search(){
  		this.navCtrl.push(SettingsPage);
  	}


	//this is called by a button on the home.html file and it updated the api call
	refresh(){
		console.log("refresh has fired")
		this.dataCall()
	}

    //this will fire when the component is loaded
	ionViewWillEnter(){

		this.dataCall()
	}
}
