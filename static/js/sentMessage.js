
// sự kiện gửi tin 
let selectSend = document.getElementById('send');
let selectMessage = document.getElementById("message");
selectSend.addEventListener('click',e=>{    
    let message= selectMessage.value;
    selectMessage.value ="";
    insertMessage(message,0);
    // gửi tin
});
selectMessage.addEventListener('keyup',e=>{    
    if(e.keyCode =="13"){
        let message= selectMessage.value;
        selectMessage.value ="";
        insertMessage(message,0);    
        //gửi tin
    }
});