
                                                 FILE TRACKING SYSTEM

**Note-Use the Correct Private Key of each Department for transactions because of Implementation of permission** 

**UI  User Guide**
1. Open http://localhost:3000 in the browser.
2. Navigate to the "Clerk" tab.
3. Input the Public key, FIN (Unique File Identification Number) and all other details in the form.
4. Submit the form.
5. Navigate to "Section Officer" tab and enter the private key of the clerk to transfer file.
7. Navigate to the "Administrative Assistant " tab and do as above.
8. Navigate to "Secretary"tab and click on the issue button. 
9. Now navigate to the "File Details" page  to view the  details.
10. Navigate to "Secretary" Page and input the private key and FIN to delete the file from the state.
11. Navigate to the "File Details" page to view the changes.


 

***Client Code Walkthrough***

Dashboards.hbs - The UI of the application is written in this file. 
Clerk form , Section Officer  form ,Administrative Asistant  form and Secretary form is written here and can be toggled. 
The end user interact with the sawtooth network via this interface.

fileList.hbs - This page lists the file details.

public/javascript/main.js - This file contains the code to extract the data from all the forms
and send to Apps router. Main.js adds logic to the Dashboards.hbs ( browser interface).

lib folder  - This folder houses a couple of js files containing reusable functions to write sawtooth
TP & Client. All important sawtooth SDK and other relevant libraries for development is
incorporated in the files contained in this folder.

UserClient.js - This file mentions the authorised Private Key of Clerk. Relevant objects & functions to submit transactions to rest API is also included.

Index.js - This contains the code block that ultimately sends the transaction to the rest API.

***Processor Code Walkthrough***

lib folder - This folder houses a couple of js files containing reusable functions to write sawtooth
TP & Client.

fileTP.js – The   handler of TP is written in this file . Transaction is submitted to the sawtooth network using the logic written in this file.

Index.js- Processor side of TP which registers the connection with the validator and strats the handler/starts the transaction procesor


**Events in Application**

Event's - In this application, we have used 2 events, one is the sawtooth inbuild block commit event, second one is a custom event in the Transaction Processor.

Custom Event : 
When a file is deleted , a custom event is triggered

