const url ="https://chatapp-kkt.herokuapp.com/"

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
var userInfor = 
    {
        id: "001",
        email: "thanhlop859@gmail.com",
        password:  "*****",
        age: 21,
        gender: 1,
        username: "Trần Thị Mỹ Tiên",
        role:"user",
        friend:[{
            email:"hai@gmail.com",
            username: "Lê Đinh Vũ"
        }, {
            email: "ak@gmail.com",
            username: "Trần Tấn Tài"
        },{
            email: "kazz@gmail.com",
            username: "Huỳnh Tấn Đức"
        }],
        group:[{
            groupId: "001",
            members:[],
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
// 3 request 
// - lay thong tin user
// - lay danh sách bạn 
// - lay danh sách request 
// - danh sách 


// đợi tài liệu load
function scriptDisplay(){
    displayListFriend();
}
function displayListFriend(){
    var selectHtml = document.querySelector(".listFriend");
   
    //create list friend
    var s = userInfor.friend.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)" id="`+ x.email+`"><div class='picture'></div><div class='nameFriend'>${x.username}</div><div class='iconOption'><i class='fas fa-ellipsis-v fa-lg'></i></div></li>` 
    });
    selectHtml.innerHTML =s.join('');   
}
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
// hiển thị khung chat 
function displayFrameChat(node){
    var id =node.getAttribute("id");
    //lấy thông tin của bạn
    //var inforFriend =  httpGet(url+"users/"+id);

    var inforFriend ={
        email:"hai@gmail.com",          //dữu liệu demo
            username: "Lê Đinh Vũ"
    }
    // hiển thị tên người đang chat 
    document.getElementsByClassName("titleBox")[0].innerText= inforFriend.username;
    
    // hiển thị khung chat cho người được chọn
    //
    //
    //

    // set input message gửi đến ai 
    //
    //
    //
    document.getElementsByClassName("chatBox")[0].setAttribute("class","chatBox display");

}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function displayListGroup(){
    var selectHtml = document.querySelector(".listFriend");
    var s = userInfor.group.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this) "><div class='picture'></div><div class='nameFriend'>${x.groupName}</div><div class='iconOption'><i class='fas fa-ellipsis-v fa-lg'></i></div></li>` 
    });
    selectHtml.innerHTML =s.join('');
}
function displayListRequest(){
    var selectHtml = document.querySelector(".listFriend");
    
    var s = userInfor.friendRequest.map(x =>{
        return `<li class='friend' onclick="friendOnClick(this)"><div class='picture'></div><div class='nameFriend'>${x.username}</div><div class='iconOption'><i class='fas fa-ellipsis-v fa-lg'></i></div></li>` 
    });
    selectHtml.innerHTML =s.join('');
}

// hàm đóng khung chat lại
function offDislayChat(){
    document.getElementsByClassName("chatBox")[0].setAttribute("class","chatBox");
    document.getElementsByClassName("titleBox")[0].innerText="Chọn bạn để chat";
}
// hàm hiển thị thông tin group hoặc friend
function onDisplayInfor(){
    var a = document.getElementsByClassName("displayInfor")[0].style.visibility = "visible";
}
function offDisplayInfor(){
    var a = document.getElementsByClassName("displayInfor")[0].style.visibility = "hidden";
}