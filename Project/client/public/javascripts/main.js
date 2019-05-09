function viewData() {
    window.location.href='/listView';

}

function createFileasClerk(event){
    event.preventDefault();
    let privKey = document.getElementById('clerkPrivKey').value;
    let FileNumb = document.getElementById('Filenum').value;
    let topic = document.getElementById('topic').value;
    let doc = document.getElementById('doc').value;
    $.post('/createFile',{key:privKey,filenum:FileNumb,date:doc,topic:topic},function(data){
    alert(data.msg);
},'json');
    
}

function transferFileasSection(event) {

    event.preventDefault();
    let privKey = document.getElementById('sectPrivKey').value;
    let FileNumb = document.getElementById('Filenum2').value;
    let DOM = document.getElementById('dom2').value;
    console.log("in main .js",FileNumb);

    $.post('/transferFileSect',{key:privKey,fin:FileNumb,Dom:DOM} ,function(data){
    alert(data.msg);
},'json');
    
}

function transferFileasAdmin(event) {

    event.preventDefault();
    let privKey = document.getElementById('adminPrivKey').value;
    let FileNumb = document.getElementById('Filenum3').value;
    let DOM = document.getElementById('dom3').value;
    $.post('/transferFileAdmin',{key:privKey,fin:FileNumb,Dom:DOM},function(data){
    alert(data.msg);
    },'json');
    
}


function transferFileasSec(event) {

    event.preventDefault();
    let privKey = document.getElementById('secPrivKey').value;
    let FileNumb = document.getElementById('Filenum4').value;
    let DOM = document.getElementById('dom4').value;
    $.post('/transferFileSec',{key:privKey,fin:FileNumb,Dom:DOM},function(data){
    alert(data.msg);
    },'json');
    
}

function deleteFile(event) {
    event.preventDefault();
    let privKey = document.getElementById('secPrivKey').value;
    let FileNumb = document.getElementById('Filenum4').value;
    $.post('/deleteFile',{key:privKey,fin:FileNumb},function(data){
        alert(data.msg);
    },'json');
}
