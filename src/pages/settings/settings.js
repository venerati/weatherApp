var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
//import { HomePage } from '../home/home';
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, storage, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.geolocation = geolocation;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    //this function takes user input from the form when the button is pressed
    SettingsPage.prototype.cityForm = function () {
        var location = {
            city: this.city,
            state: this.state,
        };
        //this takes the location object and stores it, but seeing as it has to be a string to be stored I run it through json.stringify
        this.storage.set('location', JSON.stringify(location));
        //when the function is exicuted the app will load the home page
        this.navCtrl.popToRoot();
    };
    //this function is called by the zip submit button. this function is going to clear the local storage then repopulate it with the latest user input. Then it will pop the settings page off the stack and put the user back onto home.
    SettingsPage.prototype.zipForm = function () {
        //take the user input and populate the location variable
        var location = {
            zip: this.zip
        };
        //turn the location object into a json string
        this.storage.set('location', JSON.stringify(location));
        //pop back to the root of the stack aka the home page
        this.navCtrl.popToRoot();
    };
    //this method is called by the gps search button. The method is going to clear the local storage then repopulate it with lat long information.
    SettingsPage.prototype.GPS = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            _this.lat = resp.coords.latitude;
            console.log(_this.lat);
            // resp.coords.longitude
            _this.long = resp.coords.longitude;
            console.log(_this.long);
            //take the lat long info from the phone's gps and place it into the following variables
            var location = {
                lat: _this.lat,
                long: _this.long
            };
            console.log(location.lat, location.long);
            //turn the location object into a json string
            _this.storage.set('location', JSON.stringify(location));
            //pop back to the root of the stack aka the home page
            _this.navCtrl.popToRoot();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            Geolocation])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map