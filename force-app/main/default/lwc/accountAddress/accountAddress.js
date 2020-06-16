import { LightningElement, api, track,wire } from 'lwc';
import getAddressRecords from '@salesforce/apex/AccountAddressController.getAddressRecords';
import updateAddressRecord from '@salesforce/apex/AccountAddressController.updateAddressRecord';
import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";
import AccountAddress_OBJECT from "@salesforce/schema/AccountAddress__c";
import COUNTRY_FIELD from "@salesforce/schema/AccountAddress__c.Country__c";
import STATE_FIELD from "@salesforce/schema/AccountAddress__c.State__c";
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountAddress extends NavigationMixin(LightningElement) {
    @api recordId;
    @track result;
    @track Index = 0;
    @track addressDetails = [];
    @track error;
    @track addressId;
    @track billingAddress = [];
    @track shippingAddress = [];
    @track updatedaddressDetails = [];
    @track isEdit = false;
    @track countryList=[];
    @track stateList=[];
    @track stateData=[];
    @track myList=[];

    //@track billingAddress =[{"accountRefId":"","addressId":"","description":"MeggendorferstR","icon":"action:map","location":{"City":"","Country":"","PostalCode":"","State":"","Street":"","Type":"Billing Address"},"title":"Billing Address"}];
    @track billingTmpAddress=
    [{"accountRefId":"0012X000020RvG4QAK","addressId":"a012X00003gz78YQAQ","description":"Moosach,Munich,DE","icon":"action:map","location":{"City":"Munich","Country":"DE","PostalCode":"80992","State":"BY","Street":"Moosach","Type":"Billing Address"},"title":"Billing Address"}];

    @wire(getObjectInfo, { objectApiName: AccountAddress_OBJECT})
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: COUNTRY_FIELD
      })
      countryValues({ error, data }) {
        this.countryList = undefined;
        if (data) {
          this.countryList = data.values;
        } else if (error) {
          console.log(error);
        }
      }
    
      @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: STATE_FIELD
      })
      stateValues({ error, data }) {
        this.stateData = undefined;
        if (data) {
          this.stateData = data.values;
        } else if (error) {
          console.log(error);
        }
      }

    connectedCallback() {
        getAddressRecords({ accountId: this.recordId }).then(data => {
            this.addressDetails = data;
            this.error = undefined;
            window.console.log('addressDetails---->' + JSON.stringify(this.addressDetails));
            this.addressDetails.forEach(element => {
                var addressType = element.location.Type;
                if (addressType !== "" && addressType === "Billing Address") {
                    this.billingAddress.push(element);
                    window.console.log('this.BillingAddress' + JSON.stringify(this.billingAddress));
                }
                if (addressType !== "" && addressType === "Shipping Address") {
                    
                    this.shippingAddress.push(element);
                    window.console.log('this.shippingAddress' + JSON.stringify(this.shippingAddress));
                }
            });
        }).catch(err => console.log(err));
      
    }

    editAddress() {
        this.isEdit = true;
    }

   

    handleSave() {
        this.updatedaddressDetails=[];
        console.table(JSON.stringify(this.billingAddress));
       
        this.billingAddress.forEach(element => {this.updatedaddressDetails.push(element) });
        this.shippingAddress.forEach(element => {this.updatedaddressDetails.push(element) });
        let addressToUpdate = JSON.stringify(this.updatedaddressDetails);
        updateAddressRecord({addressDetails:addressToUpdate}).then(() => {
           
            this.dispatchEvent(
              new ShowToastEvent({
                title: "success",
                message: "Address updated sucessfully",
                variant: "success"
              })
            );
            this.isEdit = false;
          }).catch(error => {
            console.log(error);
        })
    
    }
    navigateToAccountAddressHome() {
        this[NavigationMixin.Navigate]({
            "type": "standard__objectPage",
            "attributes": {
                "objectApiName": "Account__c",
                "actionName": "home"
            }
        });
    }

    handleCountryChange(event) {
       
    }
    
}