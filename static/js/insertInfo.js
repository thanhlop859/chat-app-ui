let BoxChat =document.getElementsByClassName('box-chat');

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
// chèn tin vào khung
function insertMessage(mes,status,name){   
    
    if (status===0) { // status = 0 là gửi
        BoxChat[0].innerHTML += `<div class="stl_mes"><span class="send">`+ mes+`</span></div>`;
    } else {
        BoxChat[0].innerHTML += `<div class="stl_mes"><span class="receive">`+ mes+`</span></div>`;
    }
      //tự động cuộn xuống nội dung mới 
      BoxChat[0].scrollTop = BoxChat[0].scrollHeight; 
}
