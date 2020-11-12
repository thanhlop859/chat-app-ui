const url = "https://chatapp-kkt.herokuapp.com/users/"

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
            username: "Lê Đinh Vũ"
        },{
            email:"hai@gmail.com",
            username: "Lê Đinh Vũ"
        },{
            email:"hai@gmail.com",
            username: "Lê Đinh Vũ"
        },{
            email:"hai@gmail.com",
            username: "Lê Đinh Vũ"
        },{
            email:"hai@gmail.com",
            username: "Lê Đinh Vũ"
        }, {
            email: "ak@gmail.com",
            username: "Trần Tấn Tài"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
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
                username: "Huỳnh KHấn Đức"
            }
        ],
        acceptFriendRequest:[]
};
var listChatting=[
    {
        chatId:"002",
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
                content:'Tin nhan tu vu'
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'tinh nhan tu dinh vu'
            }
        ]
    },
    {
        chatId:'001',
        email:"ak@gmail.com",
        message:[
            {
                email:"kazz@gmail.com", //đại diện người gửi
                nameSender:"Đình Vũ",
                status:'1',//status : trang thai của tin nhắn 0 là gửi 1 là nhận
                content:'a'
            },
            {
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'1',
                content:'a'
            },
            {   
                nameSender:"Đình Vũ",
                email:"kazz@gmail.com", //đại diện người gửi
                status:'0',
                content:'a'
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

// đợi tài liệu load và hiển thị danh sách bạn 
function scriptDisplay(){
    //displayListFriend();
}

// hiển thị danh sách đang chat
function onDisplayListChat(){
    
}
const selectListFriend = document.getElementsByClassName("list-friend");
const selectBoxInfoUser =document.getElementsByClassName("box-info-user");
const selectChatBox = document.getElementsByClassName("chatBox");
const selectTitleBox=document.getElementsByClassName("title-box");

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
    offPlayout('btnAddGroup','display_none');
}

// hiển thị danh sách nhóm đã join

function displayListGroup(){
    var s = userInfor.group.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)"><div class='picture'></div><div class='nameFriend'>${x.groupName}</div></li>` 
    });
    var ds =s.join('');
    boxMenu(ds);   
    onDisplayPlayout('btnAddGroup','display_none')
}

//hiển thị danh sách những yêu cầu kết bạn
function displayListRequest(){
    //create list request
    var s = userInfor.friendRequest.map(x =>{
        return `<li class='friend' id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div></li>` 
    });
    var ds =s.join('');
    boxMenu(ds);  
    offPlayout('btnAddGroup','display_none');
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
   
    offPlayout('btnAddGroup','display_none');// tắt nút thêm nhóm

}

/****************************************************************** */

// đăt lại trạng thái fucus
function friendOnClick(nodeFriend){
    var friendElements = document.getElementsByClassName('friend');
    for(var i= 0;i< friendElements.length;i++){
        friendElements[i].setAttribute("class",'friend');
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
    var boxChat = document.getElementById('box-chat');
    var titleBox = selectTitleBox;
    //lấy thông tin của bạn
    //var inforFriend =  httpGet(url+"users/"+id);

    var inforFriend ={
        email:"hai@gmail.com",          //dữu liệu demo
            username: "Lê Đinh Vũ"
    }
    // hiển thị tên người đang chat 

    // điền tin nhắn vào khung     
    titleBox[0].innerText= listChatting[0].titleChat;
    listChatting[1].message.forEach(x=>boxChat.innerHTML += `<div class="stl_mes send"><div></div><span>`+ x.content+`</span></div>`);
   
    // hiển thị khung chat cho người được chọn
    //
    //
    //

    // set input message gửi đến ai 
    //
    //
    //
    chatbox[0].setAttribute("class","chatBox display");

    //tắt nút thêm nhóm
    offPlayout('btnAddGroup','display_none');
     //tự động cuộn xuống nội dung mới 
     boxChat.scrollTop = boxChat.scrollHeight;
 
}


/*******************************************************************/

// hàm đóng khung chat lại
function offDislayChat(){
    var chatBox = selectChatBox;
    var titleBox = selectTitleBox;
    chatBox[0].setAttribute("class","chatBox");
    titleBox[0].innerText="Chọn bạn để chat";
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

const selectFormUpdate=document.getElementsByClassName("fromUpdate");


//Hiển thị form cập nhật
function onDisplayFormUpdate(){
        var formUpdate = selectFormUpdate;
        formUpdate[0].style.display="grid";
        //set thông tin
        
        document.getElementsByName('username')[0].setAttribute("placeholder",userInfor.username);
        document.getElementsByName('email')[0].setAttribute("placeholder",userInfor.email);

        document.getElementsByName('age')[0].setAttribute("placeholder",userInfor.age);
        document.getElementById("female").setAttribute("checked","checked");

        document.getElementById('overlay').style.display='block';

}

function offDisplayFormUpdate(){
    document.getElementsByClassName("fromUpdate")[0].style.display="none";
    document.getElementById('overlay').style.display='none';
}
//hàm hiển thị playout ẩn
function onDisplayPlayout(idPlayout,classDel){
    var a = document.getElementById(idPlayout).getAttribute("class");
    a =  a.replace(classDel,"");
    document.getElementById(idPlayout).setAttribute("class",a);
}
// tắt playout
function offPlayout(idPlayout,classInsert){
    var a = document.getElementById(idPlayout).getAttribute("class"); 
    if(a.search(classInsert)==(-1))
    document.getElementById(idPlayout).setAttribute("class",a+classInsert); 
}