
const {
    Message,
    EventFilter,
    EventList,
    EventSubscription,
    ClientEventsSubscribeRequest,
    ClientEventsSubscribeResponse
  } = require('sawtooth-sdk/protobuf');

const { Stream } = require('sawtooth-sdk/messaging/stream');   
const { TextDecoder } = require('text-encoding/lib/encoding')
var decoder = new TextDecoder('utf8')
const VALIDATOR_URL = "tcp://validator:4004"


// returns the subscription request status 
function checkStatus(response){
        let msg = ""
        if (response.status === 0){
                msg = 'subscription : OK'
        } else if (response.status === 1){
                msg = 'subscription : GOOD '
        } else {
                msg = 'subscription failed !'
        }
        return msg
}
        
function getEventsMessage(message){
        
  let eventlist = EventList.decode(message.content).events

  eventlist.map(function(event){
        if(event.eventType == 'sawtooth/block-commit') { 
        console.log("Event", event); 
        } 
        else if(event.eventType == "filetrack/delete") { 
                console.log("Delete event", event); 
        }
        })

}


function EventSubscribe(URL){
try{

        console.log("Inside here");
        let stream = new Stream(URL) 


const blockCommitSubscription = EventSubscription.create({ eventType: 'sawtooth/block-commit' })
const deleteSubscription = EventSubscription.create({ eventType: 'filetrack/delete'}) 

 


const subscription_request = ClientEventsSubscribeRequest.encode({ subscriptions : [blockCommitSubscription,deleteSubscription] }).finish();

stream.connect(() => { 
         
        
          
        
        stream.send(Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST,subscription_request) 
                .then(function (response){ return ClientEventsSubscribeResponse.decode(response) }) 
                .then(function (decoded_Response){ 
                console.log(checkStatus(decoded_Response)) 
                })

                stream.onReceive(getEventsMessage) 
})
}catch(error){
        console.log(error)
}
}


EventSubscribe(VALIDATOR_URL)