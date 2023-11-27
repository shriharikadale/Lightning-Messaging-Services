import { LightningElement , wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/Counting_Update__c';


export default class Sublwc extends LightningElement {

    counter =0;
    subscription = null;

    @wire(MessageContext)
    messagecontext;

    connectedCallback(){
       this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
      this.subscribeToMessageChannel = subscribe(
          this.messagecontext,
          COUNTING_UPDATED_CHANNEL,
          (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
       // console.log("message"+JSON.stringify(message));

       if(message.operator == 'Add'){
          this.counter += message.constant;
        }
       else if (message.operator == 'Substract'){
          this.counter -= message.constant;
        }
    
        else if(message.operator == 'Multiply'){
             this.counter *= message.constant;
        }
    }
}