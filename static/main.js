const url = "https://chatapp-kkt.herokuapp.com";
var user;
var author;
var listChatting=[
    {
        chatId:"001",
        titleChat:"Le duy thanh", // ten người chat hoặc nhóm đang chat
        message:[
            {
                email:"kazz@gmail.com", //đại diện người gửi
                nameSender:"Đình Vũ",
                status:'1',//status : trang thai của tin nhắn 0 là gửi 1 là nhận
                content:"Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittisdictum nisi"
            },
            {
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'1',
                content:'Tin gửi '
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'tin nhận tu dinh vu'
            },
            {
                email:"kazz@gmail.com", //đại diện người gửi
                nameSender:"Đình Vũ",
                status:'1',//status : trang thai của tin nhắn 0 là gửi 1 là nhận
                content:"Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittisdictum nisi"
            },
            {
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'1',
                content:'Tin gửi '
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'tin nhận tu dinh vu'
            }
        ]
    },
    {
        chatId:'002',
        titleChat:"nhóm 1 ",
        message:[
            {
                email:"kazz@gmail.com", //đại diện người gửi
                nameSender:"Đình Vũ",
                status:'1',//status : trang thai của tin nhắn 0 là gửi 1 là nhận
                content:'Tin nhắn của ban'
            },
            {
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'Tin nhắn của thành viên'
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'Tin nhắn của thành viên'
            },
            {
                email:"kazz@gmail.com", //đại diện người gửi
                nameSender:"Đình Vũ",
                status:'1',//status : trang thai của tin nhắn 0 là gửi 1 là nhận
                content:'Tin nhắn của ban'
            },
            {
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'Tin nhắn của thành viên'
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'Tin nhắn của thành viên'
            }
        ]
    }
];
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
           // selectNameUser.innerText = user.userName;
           // getData(urlget);
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
}
// đặt tên và trang thái cho web
function setStatus(status){
    selectStatus.innerText="Đang "+status;
    
    console.log("You are now connected to the network.");
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
    //tắt nút thêm nhóm
    //offPlayout('btnAddGroup','display-none');
}

// hiển thị danh sách bạn đang chat 
function onDisplayListChat(){
    let ds = listChatting;
    let listHTML = ds.map(x =>{
        return `<li class='friend' id="${x.chatId}" onclick="displayFrameChat(this)">
        <div class='picture' ></div>
        <div class='nameFriend'>${x.titleChat}</div>
        </li>` ;
    });
     ds =listHTML.join('');
    boxMenu(ds);   
}
// hiển thị danh sách nhóm đã join

function displayListGroup(){
    let listHTML=''; 
    let keyGroup = Object.keys(user.group);

    keyGroup.forEach(e=>{
        idNew = e+'agroup'
        listHTML += `<li class='friend' id="${idNew}">
        <div class='picture'></div>
        <div class='nameFriend' onclick="groupOnClick(${idNew},'kieuban')" >${user.group[e]}</div>
        <button class="cancel" onclick="deleteGroup(${e})">
        <i class="far fa-times-circle"></i>
        </button>
        </li>`;
    });
    boxMenu(listHTML);

    //bật nút thêm bạn
    onDisplayPlayout('btnAddGroup','display-none',0);
    // if(user.group ===null){
    //     boxMenu(listHTML);   
    // onDisplayPlayout('btnAddGroup','display-none',0);
    // }else{
    //     let keyGroup = Object.keys(user.group);
    //     keyGroup.forEach(
    //         function(e,i){
    //             listHTML += `<li class='friend' ondblclick="proupOnClick()" id="${i}">
    //             <div class='picture'></div>
    //             <div class='nameFriend'>${user.group[e]}</div>
    //              <button class="cancel" onclick="deleteGroup(this)" id=${i}>
    //              <i class="far fa-times-circle"></i>
    //              </button>
    //              </li>`});    
    //     boxMenu(listHTML);   
    //     onDisplayPlayout('btnAddGroup','display-none',0);
    // } 
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
    offPlayout('btnAddGroup','display-none');
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
    onDisplayPlayout('btnAddGroup','display-none',0);
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
    let idGroup = nodeGroup.getAttribute('id');
    idGroup =idGroup.slice(0,idGroup.length-6);
    console.log(idGroup);
    displayFrameChatGroup(idGroup);
}

/*****************************************************************/

// hiển thị khung chat cho group
function displayFrameChatGroup(idGroup){
    
    console.log(idGroup);
    let chatbox = selectChatBox;
    let boxChat = selectBoxChat;
    let titleBox = selectTitleBox;
    //tìm xem có tồn tại trong danh sách chat chưa
    let haveExist =listChatting.find(x=>x.chatId===idGroup);
    // Nếu chưa thì tạo mới
    if (haveExist ===undefined){
        listChatting.push({
            chatId:idGroup,
            titleChat:user.group[idGroup],
            message:[]
        });
        haveExist= listChatting[listChatting.length-1]; 
    };
    //hiển thị khung chat
    chatbox[0].setAttribute("class","chatBox display");
    
    // đặt id cho khung chat
    chatbox[0].setAttribute("id",listChatting[listChatting.length-1].chatId);

    // đăt title tin nhắn      
    titleBox[0].innerText= haveExist.titleChat;

    // điền tin nhắn
    haveExist.message.forEach(x=>{
        if (x.status==='1')  boxChat[0].innerHTML += `<div class="stl_mes send" ><div></div><span>`+ x.content+`</span></div>`;
        else {
            boxChat[0].innerHTML += `<div class="stl_mes recieve"><span>`+ x.content+`</span></div><div></div>`;
        }
    });
    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');
    //tự động cuộn xuống nội dung mới 
    boxChat[0].scrollTop = boxChat[0].scrollHeight;

    console.log(getInfoGroup(idGroup));
    let infoG =getInfoGroup(idGroup);
         
     // xử lí hiển thị thông tin 
     let btnDisplayInfor = document.getElementById('btnDisplayInfo');
    btnDisplayInfor.addEventListener("click",e=>{
        if(true){
            insertInfoGroup(infoG);
            onDisplayPlayout('wrapperInfo','display-none',1);
        }else{
            
            insertInfoFriend(infoF);
            onDisplayPlayout('wrapperInfo','display-none',1);
        }
        
    });
}
// hiển thị khung chat 
function displayFrameChatFriend(eFriend){
    let infoF = getInfoFriend(eFriend);
    let chatbox = selectChatBox;
    let boxChat = selectBoxChat;
    let titleBox = selectTitleBox;
    //dat lai hien thi khung chat
    boxChat[0].innerHTML="";

    let objKey = Object.keys(user.friend);
    // search danh sach chat co được tạo chưa
    let haveExist =listChatting.find(x=>x.chatId===eFriend);
    // Nếu chưa thì tạo mới
    if (haveExist ===undefined){
        listChatting.push({
            chatId:eFriend,
            titleChat:user.friend[eFriend],
            message:[]
        });
         haveExist= listChatting[listChatting.length-1]; 
    };
    // điền tin nhắn vào khung     
    titleBox[0].innerText= haveExist.titleChat;
    haveExist.message.forEach(x=>{
        if (x.status==='1')  boxChat[0].innerHTML += `<div class="stl_mes send" ><div></div><span>`+ x.content+`</span></div>`;
        else {
            boxChat[0].innerHTML += `<div class="stl_mes recieve"><span>`+ x.content+`</span></div><div></div>`;
        }
    });
    chatbox[0].setAttribute("class","chatBox display");
    chatbox[0].setAttribute("id",listChatting[listChatting.length-1].chatId); // đặt id cho khung chat
    let idChatting = chatbox[0].getAttribute("id");
    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');

     //tự động cuộn xuống nội dung mới 
     boxChat[0].scrollTop = boxChat[0].scrollHeight;
        
     // xử lí hiển thị thông tin 
    let btnDisplayInfor = document.getElementById('btnDisplayInfo');
    btnDisplayInfor.addEventListener("click",e=>{
        if(false){
            insertInfoGroup(infoF);
            onDisplayPlayout('wrapperInfo','display-none',1);
        }else{
            
            insertInfoFriend(infoF);
            onDisplayPlayout('wrapperInfo','display-none',1);
        }
        
    });
}
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
                <div>Tên: ${info.userName}</div>
                <div>Email: ${info.email}</div>
                <div>Tuổi: ${info.age}</div>
                <div>Kho lưu trữ:</div>
                <div><button onclick="deleletFriend(${info.email})" >Xóa bạn</button></div>`;
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
                <div><button onclick="addMember(${info.groupId})">Thêm thành viên</button><hr></div>
                <div><button>Xóa thành viên</button><hr></div>
                <div><button>Rời nhóm</button><hr></div>`;
    if(info.manager===user.email) html +=`<div><button>Xóa nhóm</button></div>`;
    selectIdFromInfoFriendChat.innerHTML= html;
}
// thêm member 
function addMember(idGroup){
    
    idGroup = idGroup.getAttribute('id');
    console.log(idGroup);
    onDisplayPlayout("idAddMember","display-none",1);
    let selectFrmAddMember = document.getElementById("frmAddMember");
    selectFrmAddMember.addEventListener("submit",e=>{
        e.preventDefault();
        $.ajax({
            url: url +"/groups/add",
            type:"GET",
            headers:{Authorization:author},
            data:   $('#frmAddMember').serialize()+"&groupId="+idGroup+"&email="+user.email,
            dataType:"text",
            success: function(res) {
                console.log(getInfoGroup(idGroup));
                if(res=="SUCCESS")alert("Đã thêm bạn thành công")
                else alert ("Người dùng không tồn tại hoặc đã là thành viên");
                offPlayout('idAddMember','display-none',1);
            },
             error: () =>{
                alert("Incorrect!");
             }
        });
    });
}
//Hiển thị form cập nhật
function onDisplayFormUpdate(){
        let formUpdate = selectFormUpdate;
        let overlay =selectOverlay;
        formUpdate[0].style.display="grid";
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
    console.log(e.submitter);
    // sử lí chính sửa thông tin
    var a =  $('#id-frm-updata-info').serialize()  + "&email="+user.email;
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
function deleteGroup(node){
    let keyGroup = Object.keys(user.group);
    let id = node.getAttribute("id"); // id của danh sách bạn
    let groupId =keyGroup[id];
    console.log(groupId);
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