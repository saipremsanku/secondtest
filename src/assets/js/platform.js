

function processLogout(){
	document.cookie = 'X-Authorization' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'role' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'isMobileVerified' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'isEmailVerified' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	window.location.href = '/login';
}
function justChecking(date){
	console.log("justChecking method is calling---------------> "+date)
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
