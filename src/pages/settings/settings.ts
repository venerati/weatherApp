import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	city:string;
	state:string;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage: Storage
  	) {

  	//
  	this.storage.get('location').then((val) => {
  		if(val != null) {
  			//create a the variable 'location' to handle user input
  			let location = JSON.parse(val);
  			this.city = location.city;
  			this.state = location.state;
  		} else {
  			this.city = 'Dallas';
  			this.state = 'TX';
  		}
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  //this function takes user input from the form when the button is pressed
  saveForm(){
  	let location ={
  		city: this.city,
  		state: this.state
  	}
  	//this takes the location object and stores it, but seeing as it has to be a string to be stored I run it through json.stringify
  	this.storage.set('location', JSON.stringify(location));
  	
  	//when the function is exicuted the app will load the home page
  	this.navCtrl.push(HomePage);
  }

}
