const url = "https://chatapp-kkt.herokuapp.com"
var author;
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


var user ;
function getData(){
    $.ajax({
        url:url+"/users/tester",
        type:"GET",
        async:true,
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
// 3 request 
// - lay thong tin user
// - lay danh sách bạn 
// - lay danh sách request 
// - danh sách 

/**********************************************************************/


const selectListFriend = document.getElementsByClassName("list-friend");
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

/************************************************************************** */

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
    keyFriend.forEach(e=>listHTML += `<li class='friend' id="${e}"><div class='picture'></div><div class='nameFriend' onclick="friendOnClick(${e})" >${user.friend[e]}</div><button class="cancel" onclick="deleletFriend(${e})"><i class="far fa-times-circle"></i></button></li>`
    );
    
    boxMenu(listHTML);   
    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');
}

// hiển thị danh sách bạn đang chat 
function onDisplayListChat(){
    let ds = listChatting;
    let listHTML = ds.map(x =>{
        return `<li class='friend' id="${x.chatId}" onclick="displayFrameChat(this)"><div class='picture' ></div><div class='nameFriend'>${x.titleChat}</div></li>` 
    });
     ds =listHTML.join('');
    boxMenu(ds);   
}
// hiển thị danh sách nhóm đã join

function displayListGroup(){
    let listHTML=''; 
    if(user.group ===null){
        boxMenu(listHTML);   
    onDisplayPlayout('btnAddGroup','display-none',0);
    }else{
        let keyGroup = Object.keys(user.group);
        keyGroup.forEach(function(e,i){listHTML += `<li class='friend' ondblclick="friendOnClick(this)" id="${i}"><div class='picture'></div><div class='nameFriend'>${user.group[e]}</div> <button class="cancel" onclick="deleteGroup(this)" id=${i}><i class="far fa-times-circle"></i></button></li>`});
        boxMenu(listHTML);   
        onDisplayPlayout('btnAddGroup','display-none',0);
    } 
}

//hiển thị danh sách những yêu cầu kết bạn
function displayReceiveListRequest(){
    //create list request
    let keyRe = Object.keys(user.receivedFriendRequest);
    let listHTML ="";
    keyRe.forEach(function(e,i){
        listHTML+=`<li class='friend'><div class='picture'></div><div class='nameFriend'>${user.receivedFriendRequest[e]}</div><button class="accept" onclick="acceptRequest(this)" id="${e}"><i class="far fa-check-circle"></i></button ><button class="cancel"><i class="far fa-times-circle"></i></button></li>`});
    boxMenu(listHTML);  
    offPlayout('btnAddGroup','display-none');
}

//hiển thị danh sách những yêu cầu kết bạn
function displayListRequest(){
    //create list request
    let keyRe = Object.keys(user.friendRequest);
    let listHTML ="";
    keyRe.forEach(function(e,i){
        listHTML+=`<li class='friend'><div class='picture'></div><div class='nameFriend'>${user.friendRequest[e]}</div><button class="cancel" id="${e}"><i class="far fa-times-circle"></i></button></li>`});
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

    // hàm hiển thị khung chat
    displayFrameChat(nodeFriend);
    
}
/*****************************************************************/
// hiển thị khung chat 
function displayFrameChat(node){
    let chatbox = selectChatBox;
    let id =node.getAttribute("id");
    let boxChat = selectBoxChat;
    let titleBox = selectTitleBox;
    //lấy thông tin của bạn
    //dat lai hien thi khung chat
    boxChat[0].innerHTML="";
    let objKey = Object.keys(user.friend);
    // search danh sach chat co được tạo chưa
    let haveExist =listChatting.find(x=>x.chatId===id);
    // Nếu chưa thì tạo mới
    if (haveExist ==undefined){
        let emailFriend = objKey.find(email=>email=== id);
        listChatting.push({
            chatId:emailFriend,
            titleChat:user.friend[emailFriend],
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
   
    // hiển thị khung chat cho người được chọn
    //
    //

    // set input message gửi đến ai 
    
    //
    chatbox[0].setAttribute("class","chatBox display");

    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');

     //tự động cuộn xuống nội dung mới 
     boxChat[0].scrollTop = boxChat[0].scrollHeight;
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
function onDisplayInfor(){

    // var a = document.getElementsByClassName("displayInfor")[0].style.visibility ;
    // if(a ==="hidden"){
    //     document.getElementsByClassName("displayInfor")[0].style.visibility ="visible";
    // }else{
    //     document.getElementsByClassName("displayInfor")[0].style.visibility= "hidden";
    // }
}
//Hiển thị form cập nhật
function onDisplayFormUpdate(){
        let formUpdate = selectFormUpdate;
        let overlay =selectOverlay;
        formUpdate[0].style.display="grid";
        //set thông tin
        
        document.getElementsByName('username')[0].setAttribute("placeholder",user.userName);
        document.getElementsByName('email')[0].setAttribute("placeholder",user.email);

        document.getElementsByName('age')[0].setAttribute("placeholder",user.age);
        document.getElementById("female").setAttribute("checked","checked");

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
    //  đóng form 

});

// xử lí sự kiện sửa thông tin người dùng
selectIdFrmUpdateInfo.addEventListener("submit",e =>{
    e.preventDefault();
    console.log(e.submitter);
    // sử lí chính sửa thông tin

        
    
    // đóng form 

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
            alert("Đã gửi lời mời kết bạn");
            offPlayout('frmAddFriend','display-none',1);
            displayListRequest();
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
    //  đóng form 
});
// xử lí xóa bạn
function deleletFriend(node){
    let keyGroup = Object.keys(user.friend);
    let emailF = node.getAttribute("id"); // id của danh sách bạn
    console.log(emailF);
    $.ajax({
        url: url +"/friends/remove",
        type:"DELETE",
        data:"friendEmail="+emailF+"&email="+user.email,
        headers:{Authorization:author},
        dataType:"text",
        success: function(res) {
            alert("Xóa bạn thành công");
            displayListFriend();  
        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}