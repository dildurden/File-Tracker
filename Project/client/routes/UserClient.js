const { createTransaction } = require('./lib/processor')
const { hash, getFileAddress } = require('./lib/transaction')
const fetch = require('node-fetch');

//Authorized Key of the Clerk
CLERKKEY = '8f99bb8b1dc799fd1ed9b7e370330f9378c78f7c332ac3e2233bf559ce21ea8b'

//family name
FAMILY_NAME = 'File-Tracker'

// class for File
class File {

  //Create File function

  createFile(clerk, Key, fileNumber, doc, topic) {
    console.log("Inside Create")

    let address = getFileAddress(fileNumber)
    console.log('Address', address)
    let action = "Create File"
    let payload = [action, clerk, fileNumber, doc, topic].join(',')
    if (Key == CLERKKEY) {
      createTransaction(FAMILY_NAME, [address], [address], Key, payload)
    }
    else {
      console.log('Clerk Not Authorised')
    }

  }

  //Transfer File as Section Officer Function
  
  transferSect(section_officer, Key, fileNumber, dom) {
    let action = "Tranfer File Section Officer"
    console.log("file number ", fileNumber);
    let Address = getFileAddress(fileNumber)
    let payload = [action, section_officer, fileNumber, dom].join(',')
    if (Key == CLERKKEY) {
      createTransaction(FAMILY_NAME, [Address], [Address], Key, payload)
    }
    else {
      console.log('Section Officer Not Authorised')
    }


  }

  //Transfer File as Administrative Assistant Function

  transferAdmin(admin_asst, adminKey, fileNumber, dom) {
    let action = "Tranfer File Admin"
    console.log("file number ", fileNumber);
    let Address = getFileAddress(fileNumber)
    let payload = [action,admin_asst, fileNumber, dom, ].join(',')
    if (adminKey == CLERKKEY) {
      createTransaction(FAMILY_NAME, [Address], [Address], adminKey, payload)
    }
    else {
      console.log('Adminstrative Assistant Not Authorised')
    }


  }


  //Transfer File as Secretary Function

  transferSec(secretary, secKey, fileNumber, dom) {
    let action = "Tranfer File Secretary"
    let Address = getFileAddress(fileNumber)
    let payload = [action, secretary, fileNumber, dom].join(',')
    if (secKey == CLERKKEY) {
      createTransaction(FAMILY_NAME, [Address], [Address], secKey, payload)
    }
    else {
      console.log('Secretary Not Authorised')
    }
    

  }

  //Delete File Function

  deleteFile(secretary, secKey, fileNumber){
    let action = "Delete File"
    let Address = getFileAddress(fileNumber);
    let payload = [action,secretary,fileNumber].join(',')
    if (secKey == CLERKKEY) {
      createTransaction(FAMILY_NAME, [Address], [Address], secKey, payload)
    }
    else{
      console.log('NOT AUTHORISED')
    }

  }






  /*
   * Get state from the REST API
   * @param {*} address The state address to get
   * @param {*} isQuery Is this an address space query or full address
   */

  async getState(address, isQuery) {
    let stateRequest = 'http://rest-api:8008/state';
    if (address) {
      if (isQuery) {
        stateRequest += ('?address=')
      } else {
        stateRequest += ('/address/');
      }
      stateRequest += address;
    }
    let stateResponse = await fetch(stateRequest);
    let stateJSON = await stateResponse.json();
    return stateJSON;
  }

  async getFileListings() {
    let FileListingAddress = hash(FAMILY_NAME).substr(0, 6);
    return this.getState(FileListingAddress, true);
  }


}
module.exports = { File };
