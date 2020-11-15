const url = "https://chatapp-kkt.herokuapp.com"
var author;
getCookie();
function getCookie() {
    $.ajax({
       type: "POST",
       url: url+"/auth",
       async: false,
       data: "email=tester1&password=tester1",
       xhrFields:{
            withCredentials:true
       },
       dataType:"text",
       success: function(output,status,res) {
        author =res.getResponseHeader("Authorization");
        getData('/users/tester');
       }, 
       error: () =>{
          alert("Incorrect email or password!");
       }
    });
}


var user ;
function getData(urlget){
    $.ajax({
        url:url+urlget,
        type:"GET",
        headers:{Authorization:author},
        dataType:"text",
        success: function(res) {
            user = JSON.parse(res);
            console.log(user);

        },
         error: () =>{
            alert("Incorrect!");
         }
    });
}

var userInfor = 
    {
        id: "001",
        email: "thanhlop859@gmail.com",
        password:  "*****",
        age: 21,
        gender: 1,
        username: "Lê Duy Thanh",
        role:"user",
        friend:[{
            email:"hai@gmail.com",
            username: "Đinh Vũ"
        },{
            email:"binz@.gmail.com",
            username: "Nguyễn Đan"
        },{
            email:"TinHX@gmail.com",
            username: "Huy Đinh"
        },{
            email:"amen@gmail.com",
            username: "Vũ Khắc Tường"
        },{
            email:"hiNam@gmail.com",
            username: "Lê Vũ Nam"
        }, {
            email: "ak@gmail.com",
            username: "Trần Tấn Tài"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "trung@gmail.com",
            username: "Huỳnh Đức Trung"
        },{
            email: "lozen@gmail.com",
            username: "Huỳnh Đức Trâu"
        }],
        group:[{
            groupId: "001",
            manager:"Lê Duy Thanh",
            groupName: "G1"
        }],
        friendRequest:[
            {
                email: "Hoi@gmai.com",
                username: "Lê Vũ Hội"
            }, {
                email: "quang@gmail.com",
                username: "Trần Tài Quang"
            },{
                email:"tduc@gmail.com",
                username: "Huỳnh đa Đức"
            }
        ],
        acceptFriendRequest:[]
};



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

/************************************************************************** */

// đợi tài liệu load và hiển thị danh sách bạn 
function scriptDisplay(){
  onDisplayListChat();
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
    

    //create list friend
    let listHTML = userInfor.friend.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)" id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div><button class="cancel"><i class="far fa-times-circle"></i></button></li>` 
    });
    var ds =listHTML.join('');
    boxMenu(ds);   
    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');
}

// hiển thị danh sách bạn đang chat 
function onDisplayListChat(){
    let ds = listChatting;
    let listHTML = ds.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)" id="${x.chatId}"><div class='picture'></div><div class='nameFriend'>${x.titleChat}</div></li>` 
    });
     ds =listHTML.join('');
    boxMenu(ds);   
}
// hiển thị danh sách nhóm đã join

function displayListGroup(){
    let listHTML = userInfor.group.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)"><div class='picture'></div><div class='nameFriend'>${x.groupName}</div></li>` 
    });
    var ds =listHTML.join('');
    boxMenu(ds);   
    onDisplayPlayout('btnAddGroup','display-none',0)
}

//hiển thị danh sách những yêu cầu kết bạn
function displayListRequest(){
    //create list request
    let listHTML = userInfor.friendRequest.map(x =>{
        return `<li class='friend' id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div><button class="accept"><i class="far fa-check-circle"></i></button ><button class="cancel"><i class="far fa-times-circle"></i></button></li>` 
    });
    var ds =listHTML.join('');
    boxMenu(ds);  
    offPlayout('btnAddGroup','display-none');
}
// hàm hiển thị thông tin cá nhân và đăng xuất
function displayProfile(){
    let listFriend = selectListFriend;
    listFriend[0].style.display="none";
    let boxInfoUser = selectBoxInfoUser;
    boxInfoUser[0].style.display ="flex";
    document.getElementById('myName').innerText = "Tên : "+userInfor.username;
    document.getElementById('myAge').innerText = "Tuổi : "+userInfor.age;
    document.getElementById("myGender").innerText = "Giới tính : "+userInfor.gender;
    document.getElementById('myEmail').innerText = "Địa chỉ Email : "+userInfor.email;
   
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

    // search danh sach chat co được tạo chưa
    let haveExist =listChatting.find(x=>x.chatId===id);
    // Nếu chưa thì tạo mới
    if (haveExist ==undefined){
        let objFriend = userInfor.friend.find(x=>x.email=== id);
        listChatting.push({
            chatId:objFriend.email,
            titleChat:objFriend.username,
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
        
        document.getElementsByName('username')[0].setAttribute("placeholder",userInfor.username);
        document.getElementsByName('email')[0].setAttribute("placeholder",userInfor.email);

        document.getElementsByName('age')[0].setAttribute("placeholder",userInfor.age);
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
    attributeClass =  attributeClass.replace(classDel,"");
    document.getElementById(idPlayout).setAttribute("class",attributeClass);

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
    $.ajax({
        url: url +"/group/create",
        type:"POST",
        headers:{Authorization:author},
        data: $('#id-add-group').serialize(),
        dataType:"text",
        success: function(res) {
            console.log("gửi thanh công");
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

// xử lí sự kiện search 
// selectIdSearchFriend.addEventListener("change",e=>{

// });

// xử lí gửi tin nhắn 

// xử lí chấp nhận yêu cầu kết bạn

