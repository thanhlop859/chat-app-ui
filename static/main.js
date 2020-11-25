const url = "https://chatapp-kkt.herokuapp.com";
var user;
var author;
var listChatting={};
const selectBoxInfoUser =document.getElementsByClassName("box-info-user");
const selectChatBox = document.getElementsByClassName("chatBox");
const selectTitleBox=document.getElementsByClassName("title-box");
const selectBoxChat =document.getElementsByClassName('box-chat');
const selectFormUpdate=document.getElementsByClassName("fromUpdate");
const selectFriend = document.getElementsByClassName('friend');
const selectOverlay =document.getElementsByClassName('overlay');
const selectIdFrmAddGroup = document.getElementById('id-add-group');
const selectIdFrmUpdateInfo = document.getElementById('id-frm-updata-info');
const selectIdSearchFriend = document.getElementById('id-search-friend');
const selectIdFrmAddFriend = document.getElementById("id-add-friend");
const selectNameUser = document.getElementById("nameUser");
const selectStatus = document.getElementById("status");
const selectListFriend = document.getElementsByClassName("list-friend");

/************************************************************************** */

getCookie();
function getCookie() {
    $.ajax({
       type: "POST",
       url: url+"/auth",
       async: false,
       data: "email=tester&password=tester",
       xhrFields:{
            withCredentials:true
       },
       dataType:"text",
       success: function(output,status,res) {
        author =res.getResponseHeader("Authorization");
        getData();

       }, 
       error: () =>{
          alert("Incorrect email or password!");
       }
    });
}
function getData(){
    $.ajax({
        url:url+"/users/tester",
        type:"GET",
        async:false,
        headers:{Authorization:author},
        dataType:"text",
        success: function(res) {
            user = JSON.parse(res);
           selectNameUser.innerText = user.userName;
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}
/**********************************************************************/


// đợi tài liệu load và hiển thị danh sách bạn 
function scriptDisplay(){
    onDisplayListChat(); 
    onDisplayPlayout('btnAddGroup','display-none',0);
}

// đặt tên và trang thái cho web selectStatus.innerText="Đang offline"
window.addEventListener('online',setStatus);
window.addEventListener('offline',setStatus);
function setStatus(event){
    if(navigator.onLine){
        console.log("online");
    }else{
        console.log("offline");
    }
}

//hàm hiển thị danh sách bạn
function boxMenu(ds){
    let listfriend =selectListFriend;
    let boxInfoUser = selectBoxInfoUser;
    
    listfriend[0].style.display="grid";
    boxInfoUser[0].style.display ="none";
    listfriend[0].innerHTML =ds; 
}
function displayListFriend(){
    let keyFriend = Object.keys(user.friend);
    
    // danh sách bạn
    let listHTML='';
    keyFriend.forEach(e=>{
        idNew = e+'friend'
        listHTML += `<li class='friend' id="${idNew}">
        <div class='picture'></div>
        <div class='nameFriend' onclick="friendOnClick(${idNew})" >${user.friend[e]}</div>
        <button class="cancel" onclick="deleletFriend(${idNew})">
        <i class="far fa-times-circle"></i>
        </button>
        </li>`;
    });
    boxMenu(listHTML);   
}

// hiển thị danh sách bạn đang chat 
function onDisplayListChat(){
    let idchat = Object.keys(listChatting);
    let html="";
    idchat.forEach(x =>{
        html+=`<li class='friend' id="${x+'alistC'}" onclick="displayFrameChat(this)">
        <div class='picture' ></div>
        <div class='nameFriend'>${listChatting[x].titleChat}</div>
        </li>` ;
    });
    boxMenu(html);   
}
// hiển thị danh sách nhóm đã join

function displayListGroup(){
    let listHTML=''; 
    let keyGroup = Object.keys(user.group);

    keyGroup.forEach(e=>{
        idNew = e+'agroup'
        listHTML += `<li class='friend' id="${idNew}"  onclick="groupOnClick(${idNew})" >
        <div class='picture'></div>
        <div class='nameFriend'>${user.group[e]}</div>
        </li>`;
    });
    boxMenu(listHTML);
    //bật nút thêm bạn
}

//hiển thị danh sách những yêu cầu kết bạn
function displayReceiveListRequest(){
    //create list request
    let keyRe = Object.keys(user.receivedFriendRequest);
    let listHTML ="";
    keyRe.forEach(function(e,i){
        listHTML+=`<li class='friend'>
        <div class='picture'></div>
        <div class='nameFriend'>${user.receivedFriendRequest[e]}</div>
        <button class="accept" onclick="acceptRequest(this)" id="${e}">
            <i class="far fa-check-circle"></i>
        </button >
        <button class="cancel">
            <i class="far fa-times-circle"></i>
        </button>
        </li>`});
    boxMenu(listHTML);  
}

//hiển thị danh sách những yêu cầu kết bạn
function displayListRequest(){
    //create list request
    let keyRe = Object.keys(user.friendRequest);
    let listHTML ="";
    keyRe.forEach(function(e,i){
        listHTML+=`<li class='friend'>
        <div class='picture'></div>
        <div class='nameFriend'>${user.friendRequest[e]}</div>
        <button class="cancel" id="${e}">
            <i class="far fa-times-circle"></i>
        </button>
        </li>`});
    boxMenu(listHTML);  
}
// hàm hiển thị thông tin cá nhân và đăng xuất
function displayProfile(){
    let listFriend = selectListFriend;
    listFriend[0].style.display="none";
    let boxInfoUser = selectBoxInfoUser;
    boxInfoUser[0].style.display ="flex";
    document.getElementById('myName').innerText = "Tên : "+user.userName;
    document.getElementById('myAge').innerText = "Tuổi : "+user.age;
    document.getElementById("myGender").innerText = "Giới tính : "+user.gender;
    document.getElementById('myEmail').innerText = "Địa chỉ Email : "+user.email;
   
    offPlayout('btnAddGroup','display-none',0);// tắt nút thêm nhóm

}

/****************************************************************** */
// đăt lại trạng thái fucus
function friendOnClick(nodeFriend){
    let friend = selectFriend;
    for(let i= 0;i< friend.length;i++){
        friend[i].setAttribute("class",'friend');
    }
    nodeFriend.setAttribute("class","friend active");
    let eFriend = nodeFriend.getAttribute('id');
     eFriend =eFriend.slice(0,eFriend.length-6);
    // hàm hiển thị khung chat
    displayFrameChatFriend(eFriend);
    
}
function groupOnClick(nodeGroup){
    let friend = selectFriend;
    //đặt toàn bộ lại bình thường
    for(let i= 0;i< friend.length;i++){
        friend[i].setAttribute("class",'friend');
    }
    //set trạng thai fucus
    nodeGroup.setAttribute("class","friend active");
    let groupId = nodeGroup.getAttribute('id');
    groupId =groupId.slice(0,groupId.length-6);
    displayFrameChatGroup(groupId);
}

/*****************************************************************/
var currentGroupID ="" ;
// hiển thị khung chat cho group
function displayFrameChatGroup(groupId){
    //tìm xem có tồn tại trong danh sách chat chưa
    let haveExist =listChatting[groupId];
    currentGroupID = groupId;
    // Nếu chưa thì tạo mới
    if (haveExist ===undefined){
        listChatting[groupId]={ 
            type:"group",
            titleChat:user.group[groupId],
            message:[]
        };
        haveExist= listChatting[groupId]; 
    };

    // đặt id cho khung chat
    groupId +="aframe";
    selectChatBox[0].setAttribute("id",groupId);  
    groupId = document.getElementById(groupId);
    displayFrameChat(groupId);
}
// hiển thị khung chat 
function displayFrameChatFriend(eFriend){
    // search danh sach chat co được tạo chưa
    let haveExist =listChatting[eFriend];
    // Nếu chưa thì tạo mới
    if (haveExist ===undefined){
        listChatting[eFriend]={
            type:"private",
            titleChat:user.friend[eFriend],
            message:[]
        };
         haveExist= listChatting[eFriend]; 
    };
    // đặt id cho khung chat
    eFriend +="aframe";
    selectChatBox[0].setAttribute("id",eFriend);  
    eFriend = document.getElementById(eFriend);
    displayFrameChat(eFriend);
}

function displayFrameChat(idnode){
    idnode = idnode.getAttribute("id");
    let idchat = idnode.slice(0,idnode.length-6);
     //hiển thị khung chat
    selectChatBox[0].setAttribute("class","chatBox display");
     //dat lai hien thi khung chat
     selectBoxChat[0].innerText="";
    // đăt title tin nhắn      
    selectTitleBox[0].innerText= listChatting[idchat].titleChat;
    let type =listChatting[idchat].type;
     // điền tin nhắn
    listChatting[idchat].message.forEach(x=>{
        insertMessage(x.content,x.status);
    });
     //tắt nút thêm nhóm
     offPlayout('btnAddGroup','display-none');
    let btnDisplayInfor = document.getElementById('btnDisplayInfo');

    if(listChatting[idchat].type==="group"){
        btnDisplayInfor.setAttribute('onclick',`inforOnclick(${idnode},'group')`)
    }else{
        btnDisplayInfor.setAttribute('onclick',`inforOnclick(${idnode},'private')`)
    }
     //tự động cuộn xuống nội dung mới 
    selectBoxChat[0].scrollTop = selectBoxChat[0].scrollHeight; 
}
 function inforOnclick(idchat,type){
    idchat = idchat.getAttribute('id');
    idchat =idchat.slice(0,idchat.length-6);
    let info;
    if(type ==='group'){
         info  =getInfoGroup(idchat);
    }else{
        info = getInfoFriend(idchat);
    }
    // xử lí hiển thị thông tin 
          if(type==="group"){
              insertInfoGroup(info);
              onDisplayPlayout('wrapperInfo','display-none',0);
          }else{
              insertInfoFriend(info);
              onDisplayPlayout('wrapperInfo','display-none',0);
          }        
};
/*******************************************************************/

// hàm đóng khung chat lại
function offDislayChat(){
    let  boxChat = selectBoxChat;
    
    let chatBox = selectChatBox;
    let titleBox = selectTitleBox;
    chatBox[0].setAttribute("class","chatBox");
    titleBox[0].innerText="Chọn bạn để chat";
    boxChat[0].innerHTML ="";
}


// hàm hiển thị thông tin group hoặc friend
function insertInfoFriend(info){
    console.log(info);
    let selectIdFromInfoFriendChat = document.getElementById("inforFriend");
    let html =` <div><button onclick="offPlayout('wrapperInfo','display-none',1)">
                    <i class="fas fa-arrow-left"></i>
                </button>
                </div>
                <div>Tên: ${info.userName}<hr></div>
                <div>Email: ${info.email}<hr></div>
                <div>Tuổi: ${info.age}<hr></div>
                <div>Kho lưu trữ:<hr></div>
                <div><button onclick="deleletFriend(${info.email})" >Xóa bạn</button><hr></div>`;
    selectIdFromInfoFriendChat.innerHTML= html;
}
//hàm hiển thị thông tin nhóm 
function insertInfoGroup(info){
    console.log(info);
    let selectIdFromInfoFriendChat = document.getElementById("inforFriend");
    let keyGroup = Object.keys(info.members);
    
    let html =` <div><button onclick="offPlayout('wrapperInfo','display-none',1)">
                    <i class="fas fa-times-circle"></i>
                </button></div>
                <div>Tên nhóm: ${info.groupName}<hr></div>
                <div>Số thành viên : ${keyGroup.length}<hr></div>
                <div>ID nhóm: ${info.groupId}<hr></div>
                <div>Danh sách thành viên<hr></div>
                <div><button onclick="addMember(${info.groupId+'agroup'})">Thêm thành viên</button><hr></div>
                <div><button onclick="deleteMember(${info.groupId+'agroup'})">Xóa thành viên</button><hr></div>
                <div><button onclick="leaveGroup(${info.groupId+'agroup'})">Rời nhóm</button><hr></div>`;
    if(info.manager===user.email) html +=`<div><button onclick="deleteGroup(${info.groupId+'agroup'})">Xóa nhóm</button></div>`;
    selectIdFromInfoFriendChat.innerHTML= html;
}
//xử lí xóa thành viên
function deleteMember(){
    onDisplayPlayout("idDeleteMember","display-none",1);
}
let selectFrmDeleteMember = document.getElementById("frmDeleteMember");
selectFrmDeleteMember.addEventListener("submit",e=>{
    e.preventDefault();
    $.ajax({
        url: url +"/groups/delete/members",
        type:"DELETE",
        headers:{Authorization:author},
        data:   $('#frmDeleteMember').serialize()+"&groupId="+currentGroupID+"&email="+user.email,
        dataType:"text",
        success: function(res) {
            console.log(getInfoGroup(currentGroupID));
            if(res=="SUCCEED")alert("Đã xóa thành viên")
            else alert ("Người dùng không tồn tại hoặc bạn không đủ quyền để xóa");
            offPlayout('idAddMember','display-none',1);
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
});
// xử lí rời nhóm
function leaveGroup(){
    $.ajax({
        url: url +"/groups/leave",
        type:"POST",
        headers:{Authorization:author},
        data:   "groupId="+currentGroupID+"&email="+user.email,
        dataType:"text",
        success: function(res) {
            if(res=="SUCCEED")alert("Bạn đã rời nhóm")
            else alert ("Bạn không là thành viên của nhóm");
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}
// thêm member 
function addMember(groupId){
    console.log(groupId);
    groupId = groupId.getAttribute('id');
    groupId =groupId.slice(0,groupId.length-6);

    onDisplayPlayout("idAddMember","display-none",1);
}
let selectFrmAddMember = document.getElementById("frmAddMember");
selectFrmAddMember.addEventListener("submit",e=>{
        e.preventDefault();
        $.ajax({
            url: url +"/groups/add",
            type:"GET",
            headers:{Authorization:author},
            data:   $('#frmAddMember').serialize()+"&groupId="+currentGroupID+"&email="+user.email,
            dataType:"text",
            success: function(res) {
                console.log(getInfoGroup(currentGroupID));
                if(res=="SUCCESS")alert("Đã thêm bạn thành công")
                else alert ("Người dùng không tồn tại hoặc đã là thành viên");
                offPlayout('idAddMember','display-none',1);
            },
             error: () =>{
                alert("Incorrect!");
             }
        });
    });

//Hiển thị form cập nhật
function onDisplayFormUpdate(){
        let formUpdate = selectFormUpdate;
        let overlay =selectOverlay;
        formUpdate[0].style.display="block";
        //set thông tin
        
        document.getElementsByName('userName')[0].setAttribute("placeholder",user.userName);

        document.getElementsByName('age')[0].setAttribute("placeholder",user.age);
        overlay[0].style.display='block';

}
function offDisplayFormUpdate(){
    let overlay =selectOverlay;

    document.getElementsByClassName("fromUpdate")[0].style.display="none";
    overlay[0].style.display='none';
}
//hàm hiển thị playout ẩn
function onDisplayPlayout(idPlayout,classDel,zIndex){
    let overlay =selectOverlay;
    let attributeClass = document.getElementById(idPlayout).getAttribute("class");
    var attributeClassNew =  attributeClass.replace(classDel,"");
    if (attributeClass===attributeClassNew) attributeClassNew +=classDel;
    document.getElementById(idPlayout).setAttribute("class",attributeClassNew);
    if(zIndex===1)overlay[0].style.display='block';
}
// tắt playout
function offPlayout(idPlayout,classInsert){
    let overlay =selectOverlay;

    let attributeClass = document.getElementById(idPlayout).getAttribute("class"); 
    // tìm không thấy thì + class display-none
    if(attributeClass.search(classInsert)==(-1))
    document.getElementById(idPlayout).setAttribute("class",attributeClass+classInsert); 
    
    overlay[0].style.display='none';
}
/******************************************************************************/
// xử lí sự kiện tạo nhóm
selectIdFrmAddGroup.addEventListener("submit",e =>{
    e.preventDefault();
    console.log(e.submitter);
    // sử lí tạo nhóm
    var a =  $('#id-add-group').serialize()  + "&email="+user.email;
    console.log(a);
    $.ajax({
        url: url +"/groups/create",
        type:"POST",
        headers:{Authorization:author},
        data: a,
        dataType:"text",
        success: function(res) {
            getData();
            alert("Tạo nhóm thành công");
            offPlayout('frmAddGroup','display-none');
            displayListGroup();
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
});

// xử lí sự kiện sửa thông tin người dùng
selectIdFrmUpdateInfo.addEventListener("submit",e =>{
    e.preventDefault();
    // sử lí chính sửa thông tin
    var a =  $('#id-frm-updata-info').serialize();
    console.log(a);
    $.ajax({
        url: url +"/users/edit",
        type:"POST",
        headers:{Authorization:author},
        data: a,
        dataType:"text",
        success: function(res) {
            getData();
            alert("cập nhật thành công");
            offDisplayFormUpdate()
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
});

// xử lí chấp nhận yêu cầu kết bạn
function acceptRequest(node){

    var friendE= node.getAttribute("id");

    $.ajax({
        url: url +"/friends/accept",
        type:"POST",
        headers:{Authorization:author},
        data:   "friendEmail="+friendE+"&email="+user.email,
        dataType:"text",
        success: function(res) {
            getData();
            alert("Đã chấp nhận lời mời kết bạn");
            displayReceiveListRequest();
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
    
}
/************************************/
// xử lí logout 
function onLogout(){
    window.open(url,"_self");
}
// xóa nhóm 
function deleteGroup(idnode){
    let groupId = idnode.getAttribute("id"); // id của danh sách bạn
    
    $.ajax({
        url: url +"/groups/delete",
        type:"DELETE",
        data:"groupId="+groupId+"&email="+user.email,
        headers:{Authorization:author},
        dataType:"text",
        success: function(res) {
            getData();
            alert("Xóa nhóm thành công");
            displayListGroup();
            offPlayout('frmAddGroup','display-none');
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}
// xử lí thêm bạn 
selectIdFrmAddFriend.addEventListener("submit",e =>{
    e.preventDefault();
    
    let friendE=$("input[name='friendEmail']").val();
    $.ajax({
        url: url +"/friends/add",
        type:"POST",
        headers:{Authorization:author},
        data:   $('#id-add-friend').serialize()+"&email="+user.email,
        dataType:"text",
        success: function(res) {
            getData();
            alert("Đã gửi lời mời kết bạn");
            offPlayout('frmAddFriend','display-none',1);
            displayListRequest();
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
});
// xử lí xóa bạn
function deleletFriend(node){
    let keyGroup = Object.keys(user.friend);
    let emailF = node.getAttribute("id"); // id của danh sách bạn
    $.ajax({
        url: url +"/friends/remove",
        type:"DELETE",
        data:"friendEmail="+emailF+"&email="+user.email,
        headers:{Authorization:author},
        dataType:"text",
        success: function(res) {
            getData();
            alert("Xóa bạn thành công");
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}
// lấy thông tin bạn chat
function getInfoFriend(emailF){
    let friendInfo;
        $.ajax({
            url:url+"/users/"+emailF,
            type:"GET",
            async:false,
            headers:{Authorization:author},
            dataType:"text",
            success: function(res) {
                friendInfo = JSON.parse(res);
            },
             error: () =>{
                alert("Incorrect!");
             }
        });
    return friendInfo;
}
//lấy thông tin nhóm chat
function getInfoGroup(idGroup){
    let groupInfo;
        $.ajax({
            url:url+"/groups/profile/"+idGroup,
            type:"GET",
            async:false,
            headers:{Authorization:author},
            dataType:"text",
            success: function(res) {
                groupInfo = JSON.parse(res);
            },
             error: () =>{
                alert("Incorrect!");
             }
        });
    return groupInfo;
}
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
function insertMessage(mes,status,name){   
    
    if (status===0) { // status = 0 là gửi
        selectBoxChat[0].innerHTML += `<div class="stl_mes"><span class="send">`+ mes+`</span></div>`;
    } else {
        selectBoxChat[0].innerHTML += `<div class="stl_mes"><span class="receive">`+ mes+`</span></div>`;
    }
      //tự động cuộn xuống nội dung mới 
      selectBoxChat[0].scrollTop = selectBoxChat[0].scrollHeight; 
}


// /*****************************************************************/ 
// const urlchat = 'https://chatapp-kkt.herokuapp';
// const sendBtn = document.getElementById('send');
// const mes = document.getElementById('message');
// const receive = document.getElementById('receive');
// const logout = document.getElementById('logout');

// // phần chát

// let stompClient = null;
// const email = user.email;
// console.log("email ne:   +++++: "+email);

// const connect = ()  => {

//     var socket = new SockJS(urlchat+'/websocket-chat');
//     stompClient = Stomp.over(socket);

//     stompClient.connect({}, onConnected, onError);
// }
// connect();


// function onConnected() {
//     // Subscribe to the Public Topic
//   stompClient.subscribe(urlchat+'/user/queue/newMember',  ( data) => data);

//  stompClient.subscribe(urlchat+'/topic/newMember', data => console.log("data2: " + data.body));



//     // Tell your username to the server
//   sendMessage(urlchat+'/app/register', email);

//     stompClient.subscribe(urlchat+`/user/${email}/msg`,  data =>{
//     console.log(`-------- received message:\n`+ data.body+`\n--------received message!!!!`);
//     displayMessage(data);
//   });
// }

// function onError(error) {
//     console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
// }

// function sendMessage(url, message) {
//     stompClient.send(url, {}, message);
// }


// const displayMessage = data =>{
// let mess = JSON.parse(data.body);
// console.log(" jhdsjfldsk:  "+mess);
// receive.innerHTML = `from: `+mess.sender+`\n message: `+ mess.message+"\n to: "+mess.recipient;
// }


// const onDisconnect = () =>{
//   sendMessage(urlchat+'/app/unregister', email);
//   stompClient.disconnect();
// }

// sendBtn.addEventListener('click', () => {
//   let messa = mes.value;
//   sendMessage(urlchat+'/app/message', JSON.stringify({
//     recipient: 'tester',
//     sender: email,
//     message: messa
//   }));
//   mes.innerHTML = '';
// });

// logout.addEventListener('click', onDisconnect);