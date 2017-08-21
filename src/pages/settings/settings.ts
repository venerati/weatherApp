import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage: Storage
  	) {

  	// //calls the storage component and pulls the location object then binds it's values to 'val'
  	// this.storage.get('location').then((val) => {
  	// 	if(val != null) {
  	// 		//create a the variable 'location' to handle user input
  	// 		let location = JSON.parse(val);
  	// 		this.city = location.city;
  	// 		this.state = location.state;
  	// 		this.zip = location.zip;

  	// 	} else {

  	// 		//sets the value of storage object to the following if val is null
  	// 		this.city = 'Dallas';
  	// 		this.state = 'TX';
  	// 		this.zip = '75077';
  	// 	}
  	// });
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
  		//remove existing data from storage
  		

  		console.log(location);

  		//turn the location object into a json string
  		this.storage.set('location', JSON.stringify(location));

  		//pop back to the root of the stack aka the home page
  		this.navCtrl.popToRoot();
  }

}
