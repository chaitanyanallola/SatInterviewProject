import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from "lightning/uiRecordApi";
import { NavigationMixin } from 'lightning/navigation';
const FIELDS = [
  "AccountAddress__c.Account__c",
  "AccountAddress__c.City__c",
  "AccountAddress__c.Country__c",
  "AccountAddress__c.Postalcode__c",
  "AccountAddress__c.Street__c",
  "AccountAddress__c.AddressType__c",
  "AccountAddress__c.State__c",
  "AccountAddress__c.Id"
];
export default class AddAddress extends NavigationMixin(LightningElement) {
  @api recordId;
  @track wiredData=[];

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  wiredRecord({ error, data }) {
    this.wiredData = data;
    if (error) {
      let message = "Unknown error";
      if (Array.isArray(error.body)) {
        message = error.body.map((e) => e.message).join(", ");
      } else if (typeof error.body.message === "string") {
        message = error.body.message;
      }
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading Address",
          message,
          variant: "error"
        })
      );
    }

  }

  handleSuccess(event) {
    const evt = new ShowToastEvent({
      message: "Address has been saved sucessfully",
      variant: "success",
    });
    this.dispatchEvent(evt);
  }

  navigateToAccountAddressHome() {
    this[NavigationMixin.Navigate]({
      "type": "standard__objectPage",
      "attributes": {
        "objectApiName": "AccountAddress__c",
        "actionName": "home"
      }
    });
  }



}