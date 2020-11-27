const selectIdFrmUpdateInfo = document.getElementById('id-frm-updata-info');



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