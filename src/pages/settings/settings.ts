import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
//import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	city:string;
	state:string;
	zip:string;
  lat:number;
  long:number;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage: Storage,
    private geolocation: Geolocation
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  	//this function takes user input from the form when the button is pressed
  	cityForm(){
	  	let location ={
	  		city: this.city,
	  		state: this.state,
	  	}
	  	//this takes the location object and stores it, but seeing as it has to be a string to be stored I run it through json.stringify
	  	this.storage.set('location', JSON.stringify(location));
	  	
	  	//when the function is exicuted the app will load the home page
	  	this.navCtrl.popToRoot();
	}

  //this function is called by the zip submit button. this function is going to clear the local storage then repopulate it with the latest user input. Then it will pop the settings page off the stack and put the user back onto home.
  zipForm(){

  		//take the user input and populate the location variable
  		let location ={
  			zip: this.zip
  		}

  		//turn the location object into a json string
  		this.storage.set('location', JSON.stringify(location));

  		//pop back to the root of the stack aka the home page
  		this.navCtrl.popToRoot();
  }

  //this method is called by the gps search button. The method is going to clear the local storage then repopulate it with lat long information.
  GPS(){

    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     this.lat = resp.coords.latitude;
     console.log(this.lat)
     // resp.coords.longitude
     this.long = resp.coords.longitude;
     console.log(this.long)

    //take the lat long info from the phone's gps and place it into the following variables
    let location = {
      lat: this.lat,
      long: this.long
    }

    console.log(location.lat, location.long)
    //turn the location object into a json string
    this.storage.set('location', JSON.stringify(location));

    //pop back to the root of the stack aka the home page
    this.navCtrl.popToRoot();

     }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
