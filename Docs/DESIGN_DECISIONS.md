


**Note** - A Unique file  Number (FIN) is assigned for every single file considered in the application.

**Note** - The application is designed for a four-member network, each participant from a Government Department.

1. File addressing Scheme --- File addressing scheme is the first 6 hex character is the hash of FamilyName, then the next 6 hex character is hash of the file number and the next 58 hex character is hash of the public key of the clerk who is initiating the transaction.
We have decided to store the details of a file in same address corresponding to the department. 

Though there are several other possibilities but we have considered the above mentioned

Address = hash(FamilyName).slice(0,6)+hash(vin).slice(0,6)+hash(publickey of clerk).slice(0,58)

Hashing is done using SHA512.


2. About Transaction Family's --- We have 1 transaction family, "File-Track" 

3. Node's of the network - The heads of various Govt.Departments

for example:Secretary of Education department

Note:We did not took the Goverment hierarchy as such,but changed as per our requirement


4. Event's - In this application, we have used 2 events. First, sawtooth inbuild block commit event, second one is a custom event in the Transaction Processors.

Custom Event:
When File Deletion is done  by the secretary department, a custom event occurs as a notification.



