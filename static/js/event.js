const selectFriend = document.getElementsByClassName('friend');


var currentGroupID ="" ;
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