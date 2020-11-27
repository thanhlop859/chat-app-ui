const selectBoxInfoUser =document.getElementsByClassName("box-info-user");
const selectChatBox = document.getElementsByClassName("chatBox");
const selectTitleBox=document.getElementsByClassName("title-box");
const selectBoxChat =document.getElementsByClassName('box-chat');
const selectFormUpdate=document.getElementsByClassName("fromUpdate");
const selectOverlay =document.getElementsByClassName('overlay');
const selectListFriend = document.getElementsByClassName("list-friend");


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

// hàm đóng khung chat lại
function offDislayChat(){
    let  boxChat = selectBoxChat;
    
    let chatBox = selectChatBox;
    let titleBox = selectTitleBox;
    chatBox[0].setAttribute("class","chatBox");
    titleBox[0].innerText="Chọn bạn để chat";
    boxChat[0].innerHTML ="";
}

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
