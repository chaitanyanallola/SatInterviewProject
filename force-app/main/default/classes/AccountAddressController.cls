public with sharing class AccountAddressController {
 @AuraEnabled (cacheable=true)
    public static List<WrapperService.Location>  getAddressRecords(String accountId) {
         List<AccountAddress__c> lstAddress=new List<AccountAddress__c>();
          List<WrapperService.Location> loc = new List<WrapperService.Location>();
        try{
            lstAddress =getAddressByAccountId(accountId);
                for(AccountAddress__c acc :lstAddress){
                    WrapperService.GeoLocation geoInfo = new WrapperService.GeoLocation();
                    geoInfo.Street = acc.Street__c;
                    geoInfo.PostalCode = acc.PostalCode__c;
                    geoInfo.City = acc.City__c;
                    geoInfo.Type=acc.AddressType__c;
                    geoInfo.State = acc.State__c;
                    geoInfo.Country = acc.Country__c;  
                    WrapperService.Location locDetail = new WrapperService.Location();
                    locDetail.addressId=acc.Id;
                    locDetail.accountRefId=acc.Account__c;
                    locDetail.icon = 'action:map'; 
                    locDetail.title = acc.AddressType__c;
                    locDetail.description = acc.Street__c+','+ acc.City__c +','+acc.Country__c;
                    locDetail.location = geoInfo;
                    loc.add(locDetail); 	
                }
       
        if(lstAddress.isEmpty()) {
            throw new AuraHandledException('Keine Aufzeichnung gefunden.');
        }
       
        }
        Catch(exception ex){
            System.debug('exception' +ex.getMessage());
        }
         return loc ;
    }
    
     @AuraEnabled
    public static List<AccountAddress__c>  updateAddressRecord(List<WrapperService.Location> addressDetails) {
         List<AccountAddress__c> lstAddress=new List<AccountAddress__c>();
         try{
        	for(WrapperService.Location locData:addressDetails){
                if(!String.isEmpty(locData.addressId)){
                    AccountAddress__c addressObj=new AccountAddress__c();
                    addressObj.Id=locData.addressId;
                    addressObj.Street__c=locData.location.Street;
                    addressObj.PostalCode__c=locData.location.PostalCode;
                    addressObj.State__c=locData.location.State;
                    addressObj.City__c=locData.location.City;
                    addressObj.Country__c=locData.location.Country;
                    addressObj.AddressType__c=locData.location.Type;
                    lstAddress.add(addressObj);
                }
        }
        update lstAddress;
        }
        Catch(exception ex){
            System.debug('exception' +ex.getMessage());
        }
        return lstAddress;
    }
    
  
    
    @AuraEnabled
    public static List<AccountAddress__c> getAddressByAccountId(string accountId){
        return [ select Id,Name,Account__r.ID,City__c,Country__c,PostalCode__c,
                Street__c,State__c,AddressType__c
                from AccountAddress__c where Account__r.ID =:accountId];
    }
    
   

}