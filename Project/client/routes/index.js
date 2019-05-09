var express = require('express');
var{ File }= require('./UserClient')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboards', { title: 'Dashboards' });
});


// To Get The File Details
/////

router.get('/listFiles', async (req,res)=>{
  var fileClient = new File();
  let stateData = await fileClient.getFileListings();
  console.log("listings", stateData);
  let filesList = [];
  stateData.data.forEach(files => {
    if(!files.data) return;
    let decodedFiles = Buffer.from(files.data, 'base64').toString();
    let fileDetails = decodedFiles.split(',');

    console.log("decodedFiles------", fileDetails);
    console.log('Length',fileDetails.length)
    filesList.push({
      fileNum: fileDetails[1],
      doc: fileDetails[2], 
      topic: fileDetails[3],    
      dom: fileDetails[4],
      dom2: fileDetails[6],
      dom3: fileDetails[8],
      status: (fileDetails.length=== 10)?'Order Issued':'Order Pending'
      
    });
    console.log('Length',fileDetails.length)
  });

  res.render('fileList', { listings: filesList });
});


router.get('/homePage',(req,res)=>{
  res.render('dashboards', { title: 'Dashboards' });
});

//////

//POST Methods for creating,transfering and deleting files

router.post('/createFile',function(req, res){
  
  let key = req.body.key
  let fin = req.body.filenum
  let topic = req.body.topic
  let doc = req.body.date
  console.log(key,'',fin,'',topic,'',doc)
  console.log("Data sent to REST API");
  var file = new File();
  file.createFile("Clerk",key,fin,doc,topic)
  res.send({msg:"File Created"});
})

router.post('/transferFileSect',function(req, res){
  let key = req.body.key
  let fin = req.body.fin
  let dom1 = req.body.Dom
  console.log("Data sent to REST API");
 
  var file = new File();
  file.transferSect("Section-Officer",key,fin,dom1)
  res.send({msg: "File transfered successfully"});
})

router.post('/transferFileAdmin',function(req, res){
  let key = req.body.key
  let fin = req.body.fin
  let dom = req.body.Dom
  console.log("Data sent to REST API");
  var file = new File();
  file.transferAdmin("Adminstrative-Assistant",key,fin,dom)
  res.send({msg: "File transfered successfully"});
})

router.post('/transferFileSec',function(req, res){
  let key = req.body.key
  let fin = req.body.fin
  let dom = req.body.Dom
  console.log("Data sent to REST API");
  var file = new File();
  file.transferSec("Secretary",key,fin,dom)
  res.send({msg: "File transfered successfully"});
})

router.post('/deleteFile',function(req,res){
  let key = req.body.key
  let fin = req.body.fin
  console.log('Data sent to REST API');
  var file = new File();
  file.deleteFile("Secretary",key,fin);
  res.send({msg: "File Deleted Succesfully"})
})

module.exports = router;
