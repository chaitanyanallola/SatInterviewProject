import { LightningElement,track } from 'lwc';
import performCallout from '@salesforce/apex/WeatherController.performCallout';

export default class Weather extends LightningElement {
    @track myValue = '';
    @track mapMarkers = [];
    @track zoomLevel=5;

    get getConvertedTemp() {
        if (this.result) {
            return Math.round((this.result.cityTemp)) + 'º';
            //return Math.round((this.result.cityTemp * (9/5)) + 32) + ' deg';
        } else {
            return '--';
        }
    }
 
    get getCurrentWindSpeed() {
        if (this.result) {
            return this.result.cityWindSpeed + ' mph';
        } else {
            return '--';
        }
    }
 
    get getCurrentPrecip() {
        if (this.result) {
            return this.result.cityPrecip;
        } else {
            return '--';
        }
    }
 
    handleChange(evt) {
        console.log('Current value of the input: ' + evt.target.value);
        this.value =  evt.target.value;
        console.log('Current value of the input: ' + evt.target.value);
        performCallout({location: this.value}).then(data => {
      
            this.mapMarkers = [{
                location: {
                    Latitude: data['cityLat'],
                    Longitude: data['cityLong']
                },
                title: data['cityName'],
            }];
            this.result = data;
            window.console.log('data---->' +JSON.stringify( this.result));
           
        }).catch(err => console.log(err));
    }
}