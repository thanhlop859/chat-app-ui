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


// đợi tài liệu load và hiển thị danh sách bạn 
function scriptDisplay(){
  onDisplayListChat();
}

//hàm hiển thị danh sách bạn
function boxMenu(ds){
    var listfriend =selectListFriend;
    var boxInfoUser = selectBoxInfoUser;
    
    listfriend[0].style.display="grid";
    boxInfoUser[0].style.display ="none";
    listfriend[0].innerHTML =ds; 
}
function displayListFriend(){
    

    //create list friend
    var s = userInfor.friend.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)" id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div></li>` 
    });
    var ds =s.join('');
    boxMenu(ds);   
    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display-none');
}

// hiển thị danh sách bạn đang chat 
function onDisplayListChat(){
    var ds = listChatting;
    var s = ds.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)" id="${x.chatId}"><div class='picture'></div><div class='nameFriend'>${x.titleChat}</div></li>` 
    });
     ds =s.join('');
    boxMenu(ds);   
}
// hiển thị danh sách nhóm đã join

function displayListGroup(){
    var s = userInfor.group.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)"><div class='picture'></div><div class='nameFriend'>${x.groupName}</div></li>` 
    });
    var ds =s.join('');
    boxMenu(ds);   
    onDisplayPlayout('btnAddGroup','display-none',0)
}

//hiển thị danh sách những yêu cầu kết bạn
function displayListRequest(){
    //create list request
    var s = userInfor.friendRequest.map(x =>{
        return `<li class='friend' id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div></li>` 
    });
    var ds =s.join('');
    boxMenu(ds);  
    offPlayout('btnAddGroup','display-none');
}
// hàm hiển thị thông tin cá nhân và đăng xuất
function displayProfile(){
    var listFriend = selectListFriend;
    listFriend[0].style.display="none";
    var a = selectBoxInfoUser;
    a[0].style.display ="flex";
    document.getElementById('myName').innerText = "Tên : "+userInfor.username;
    document.getElementById('myAge').innerText = "Tuổi : "+userInfor.age;
    document.getElementById("myGender").innerText = "Giới tính : "+userInfor.gender;
    document.getElementById('myEmail').innerText = "Địa chỉ Email : "+userInfor.email;
   
    offPlayout('btnAddGroup','display-none',0);// tắt nút thêm nhóm

}

/****************************************************************** */
// đăt lại trạng thái fucus
function friendOnClick(nodeFriend){
    var friend = selectFriend;
    for(var i= 0;i< friend.length;i++){
        friend[i].setAttribute("class",'friend');
    }
    nodeFriend.setAttribute("class","friend active");

    // hàm hiển thị khung chat
    displayFrameChat(nodeFriend);
    
}
/*****************************************************************/
// hiển thị khung chat 
function displayFrameChat(node){
    var chatbox = selectChatBox;
    var id =node.getAttribute("id");
    var boxChat = selectBoxChat;
    var titleBox = selectTitleBox;
    //lấy thông tin của bạn
    //dat lai hien thi khung chat
    boxChat[0].innerHTML="";

    // search danh sach chat co được tạo chưa
    var haveExist =listChatting.find(x=>x.chatId===id);
    // Nếu chưa thì tạo mới
    if (haveExist ==undefined){
        var objFriend = userInfor.friend.find(x=>x.email=== id);
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
    var  boxChat = selectBoxChat;
    
    var chatBox = selectChatBox;
    var titleBox = selectTitleBox;
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
const selectOverlay =document.getElementsByClassName('overlay');
//Hiển thị form cập nhật
function onDisplayFormUpdate(){
        var formUpdate = selectFormUpdate;
        var overlay =selectOverlay;
        formUpdate[0].style.display="grid";
        //set thông tin
        
        document.getElementsByName('username')[0].setAttribute("placeholder",userInfor.username);
        document.getElementsByName('email')[0].setAttribute("placeholder",userInfor.email);

        document.getElementsByName('age')[0].setAttribute("placeholder",userInfor.age);
        document.getElementById("female").setAttribute("checked","checked");

        overlay[0].style.display='block';

}

function offDisplayFormUpdate(){
    var overlay =selectOverlay;

    document.getElementsByClassName("fromUpdate")[0].style.display="none";
    overlay[0].style.display='none';
}
//hàm hiển thị playout ẩn
function onDisplayPlayout(idPlayout,classDel,zIndex){
    var overlay =selectOverlay;
    var a = document.getElementById(idPlayout).getAttribute("class");
    a =  a.replace(classDel,"");
    document.getElementById(idPlayout).setAttribute("class",a);

    if(zIndex===1)overlay[0].style.display='block';

}
// tắt playout
function offPlayout(idPlayout,classInsert){
    var overlay =selectOverlay;

    var a = document.getElementById(idPlayout).getAttribute("class"); 
    // tìm không thấy thì + class display-none
    if(a.search(classInsert)==(-1))
    document.getElementById(idPlayout).setAttribute("class",a+classInsert); 
    
    overlay[0].style.display='none';
}