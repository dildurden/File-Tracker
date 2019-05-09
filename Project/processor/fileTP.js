const {TextDecoder} = require('text-encoding/lib/encoding')
const {TransactionHandler} = require('sawtooth-sdk/processor/handler')
const {hash,writeToStore,getFileAddress,deleteFromState} = require('./lib/transaction')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const FAMILY_NAME = "File-Tracker"
const NAMESPACE = hash(FAMILY_NAME).substring(0, 6);

var decoder = new TextDecoder('utf8')


CLERKKEY = '8f99bb8b1dc799fd1ed9b7e370330f9378c78f7c332ac3e2233bf559ce21ea8b'



//Add file function

function addFile (context,clerk,fileNumber,doc,topic) {
    let file_Address = getFileAddress(fileNumber)
    let file_detail =[clerk,fileNumber,doc,topic]
    return writeToStore(context,file_Address,file_detail)
}

// Transfer file 

function transferFile(context,role,fileNumber,dom){
    console.log("Transfer file ")
    let address = getFileAddress(fileNumber)
    console.log("me address",address);
    return context.getState([address]).then(function(data){
    console.log("data",data)
    if(data[address] == null || data[address] == "" || data[address] == []){
        console.log("Invalid fileNumber!")
    }else{
    let stateJSON = decoder.decode(data[address])
    let newData = stateJSON + "," + [dom,role].join(',')
    return writeToStore(context,address,newData)
    }
    })
            
}

// Delete File

function deleteFile(context,role,fileNumber){
    console.log('Inside Delete file');
    let address = getFileAddress(fileNumber);
    console.log('The Address to be deleted',address);
    return context.getState([address]).then(function(data){
        console.log("data",data)
        if(data[address] == null || data[address] == "" || data[address] == []){
            console.log("Invalid fileNumber!");
        }else{
            context.addEvent('filetrack/delete');
            return deleteFromState(context,address);
        }

    })
}

//transaction handler class

class FileHandler extends TransactionHandler{
    constructor(){
        super(FAMILY_NAME, ['1.0'], [NAMESPACE]);
    }

//apply function
apply(transactionProcessRequest, context){
    let PayloadBytes = decoder.decode(transactionProcessRequest.payload)
    let Payload = PayloadBytes.toString().split(',')
    let action = Payload[0]
    console.log("0",Payload[0]);
    console.log("01",Payload[1]);
    console.log("02",Payload[2]);
    console.log("03",Payload[3]);
    console.log("04",Payload[4]);
    //Returning the functions based on ACTION
    if (action === "Create File"){
        return addFile(context,Payload[1],Payload[2],Payload[3],Payload[4])
    }
    else if (action === "Tranfer File Section Officer"){
        console.log("reached tp");
        return transferFile(context,Payload[1],Payload[2],Payload[3])
    }
    else if (action === "Tranfer File Admin"){
        console.log("reached tp");
        return transferFile(context,Payload[1],Payload[2],Payload[3])
    }
    else if (action === "Tranfer File Secretary"){
        console.log("reached tp");
        return transferFile(context,Payload[1],Payload[2],Payload[3])
    }
    else if (action === "Delete File"){
        console.log("reached tp");
        return deleteFile(context,Payload[1],Payload[2])
    }
    
    else{
        console.log("error");
    }
}
}
module.exports = FileHandler;
