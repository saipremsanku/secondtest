// Server call




/*
function callServer(url,type,formData){
    var xAuth  =  null;
    if(document.cookie.split(';')[0].split('=')[0].localeCompare('X-Authorization') == 0){
         xAuth = document.cookie.split(';')[0].split('=')[1];
    }
    $.ajax({
       url,
       type,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "false",
        data: JSON.stringify(formData),
        headers: {
            "X-Authorization": xAuth
        },
        success: function(data) {
            console.log('success--------------')
            console.log(data)
            console.log(data.payLoad)
         if(data.status === "SUCCESS"){
             return data.payLoad;
         }
         else{
            console.log('transport error');
             return -1;
         }
     }
    });
}
*/

