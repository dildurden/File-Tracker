/*
module to deal with writing data to store , address generation ,hashing etc
*/


const crypto = require('crypto');
const {TextEncoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');

var encoder = new TextEncoder('utf8')

//Clerk private key 
CLERKKEY = '8f99bb8b1dc799fd1ed9b7e370330f9378c78f7c332ac3e2233bf559ce21ea8b'

// function to hash data
function hash(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
}

/* function to write data to state 
parameter : 
    context -  validator context object
    address - address to which data should be written to
    data - the data tto be written
*/
function writeToStore(context, address, data){
        dataBytes = encoder.encode(data)
        let entries = {
        [address]: dataBytes
      }
    return context.setState(entries);
    
}

/* function to retrive the address of a particular vehicle based on its vin number */

function getFileAddress(fileNumber){
    console.log("me file number",fileNumber);
    console.log('Inside Get file address')
    const context = createContext('secp256k1');
    console.log('Returning context')
    let key = Secp256k1PrivateKey.fromHex(CLERKKEY)
    console.log('Returning context',key)
    let signer = new CryptoFactory(context).newSigner(key);
    console.log('Returning signer')
    let publicKeyHex = signer.getPublicKey().asHex() 
    console.log('Returning publivkey',publicKeyHex)   
    let keyHash  = hash(publicKeyHex)
    console.log('Returning keyhash',keyHash)
    let nameHash = hash("File-Tracker")
    console.log('Returningname',nameHash)
    let fileHash = hash(fileNumber)
    console.log('Returning')
    return nameHash.slice(0,6) +fileHash.slice(0,6)+keyHash.slice(0,58)

}

module.exports = {
hash,
writeToStore,
getFileAddress
}