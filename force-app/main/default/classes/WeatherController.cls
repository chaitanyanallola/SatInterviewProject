public class WeatherController {
  
    
     @AuraEnabled (cacheable=true)
    public static WrapperService.WeatherData performCallout(String location) {
        String apiKey = System.label.weatherAPIkey;
		String requestEndpoint = 'http://api.openweathermap.org/data/2.5/weather';
		requestEndpoint += '?q=' + location;
		requestEndpoint += '&units=metric';
		requestEndpoint += '&APPID=' + apiKey;
		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint(requestEndpoint);
		request.setMethod('GET');
		HttpResponse response = http.send(request);
        JSONParser parser = JSON.createParser(response.getBody());
        WrapperService.WeatherData weather = new WrapperService.WeatherData();
        while (parser.nextToken() != null) {
            if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                parser.nextValue();
                if (parser.getCurrentName() == 'temp') {
                    weather.cityTemp = Decimal.valueOf(parser.getText());
                } else if (parser.getCurrentName() == 'name') {
                    weather.cityName = parser.getText();
                } else if (parser.getCurrentName() == 'country') {
                    weather.state = parser.getText();
                } else if (parser.getCurrentName() == 'timezone') {
                    weather.cityTimeZone = parser.getText();
                } else if (parser.getCurrentName() == 'speed') {
                   weather.cityWindSpeed = Decimal.valueOf(parser.getText());
                } else if (parser.getCurrentName() == 'lat') {
                    weather.cityLat = parser.getText();
                } else if (parser.getCurrentName() == 'lon') {
                    weather.cityLong = parser.getText();
                }  else if (parser.getCurrentName() == 'humidity') {
                   weather.cityPrecip = Decimal.valueOf(parser.getText());
                }else if (parser.getCurrentName() == 'description') {
                     weather.cityDescription = parser.getText();
                } 
            }
        }
      
        return weather;
		
    }
    
    
}