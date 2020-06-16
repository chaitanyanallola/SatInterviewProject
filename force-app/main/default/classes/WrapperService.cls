public with sharing class WrapperService {
 public class WeatherData {
        @AuraEnabled public String cityName;
        @AuraEnabled public String cityTimeZone;
        @AuraEnabled public Decimal cityTemp;
        @AuraEnabled public String state;
        @AuraEnabled public Decimal cityWindSpeed;
        @AuraEnabled public String cityLat;
        @AuraEnabled public String cityLong;
        @AuraEnabled public Decimal cityPrecip;
        @AuraEnabled public String cityDescription;
    }
    
       public class Location{
        @AuraEnabled 
        public String addressId{get;set;} 
        @AuraEnabled 
        public String accountRefId{get;set;} 
        @AuraEnabled 
        public String icon{get;set;} 
        @AuraEnabled 
        public String title{get;set;} 
        @AuraEnabled
        public String description{get;set;} 
         
        @AuraEnabled 
        public GeoLocation location{get;set;} 
        
    }
    public class GeoLocation{
        @AuraEnabled 
        public String Type{get;set;}
        @AuraEnabled 
        public String Street{get;set;}
        @AuraEnabled 
        public String PostalCode{get;set;}
        @AuraEnabled 
        public String City{get;set;}
        @AuraEnabled 
        public String State{get;set;}
        @AuraEnabled 
        public String Country{get;set;}
        @AuraEnabled 
        public String StateLabel{get;set;}
        @AuraEnabled 
        public String CountryLabel{get;set;}
    }
}