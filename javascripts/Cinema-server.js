document.documentElement.style.overflowY = 'hidden';
document.documentElement.style.overflowX = 'hidden';
function getvalue(name) {
    var str = window.location.search;
    if (str.indexOf(name) != -1) {
        var pos_start = str.indexOf(name) + name.length + 1;
        var pos_end = str.indexOf("?", pos_start);
        if (pos_end == -1) {
            return str.substring(pos_start);
        } else {
            alert("对不起这个值不存在！");
        }
    }
}
if (getvalue("type") == "bilibili") {
    var id = getvalue("id");
    var page = getvalue("page");
    if (id != null) {
        if (page != null) {
            var tmp = document.getElementById("vid");
            tmp.src = "https://static-s.bilibili.com/miniloader.swf?aid=" + id + "&page=" + page + "&autoplay=1";

        } else {
            var tmp = document.getElementById("vid");
            tmp.src = "https://static-s.bilibili.com/miniloader.swf?aid=" + id + "&autoplay=1";
        }
        tmp.type = "application/x-shockwave-flash";
        tmp.flashvars = "aid=" + id + "&amp;page=0&amp;autoplay=1";
        tmp.pluginspage = "https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";
        tmp.quality = "high";
        tmp.height = document.body.scrollHeight;
        tmp.width = document.body.scrollWidth;
        tmp.webkitRequestFullscreen();
    }
}