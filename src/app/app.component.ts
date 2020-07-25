import { Component, OnInit } from '@angular/core';

import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "weather-app";
  WeatherData:any;
  loc = "";
  currLat: any;
  currLng: any;
  faSun = faSun;
  faMoon = faMoon;
  faCloud = faCloud;
  constructor(){}

  ngOnInit(){
    this.WeatherData = {
      main : {},
      isDay: true
    };

    this.getCurrentLocation();

    
    
    console.log(this.WeatherData);

  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log("Latitude: "+ this.currLat + " Longitude: "+ this.currLng);
        this.getWeatherData(this.currLat, this.currLng);
      });
    }
    else {
      console.error("The browser does not support geolocation...");
    }
  }

  getWeatherData(lat: any, lng: any){
    
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat +'&lon=' + lng +'&appid=5ddcf8d496fed345a3d6e616b3cea1b8')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    //let data = JSON.parse('{"coord":{"lon":73.2,"lat":22.3},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":306.33,"feels_like":309.11,"temp_min":306.33,"temp_max":306.33,"pressure":1006,"humidity":55,"sea_level":1006,"grnd_level":1001},"visibility":10000,"wind":{"speed":3.44,"deg":304},"clouds":{"all":0},"dt":1595567644,"sys":{"country":"IN","sunrise":1595550942,"sunset":1595598684},"timezone":19800,"id":1253573,"name":"Vadodara","cod":200}');

  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset*1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString;
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celsius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }

  searchweather(loc: string){

    this.loc = loc;
    console.log(this.loc);

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.loc +'&appid=5ddcf8d496fed345a3d6e616b3cea1b8')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

  }

  setclass(){
    let myclass = {
      day: this.WeatherData.isDay,
      night: !this.WeatherData.isDay,
    }

    return myclass;
  }

}
