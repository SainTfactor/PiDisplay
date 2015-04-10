$(function(){		
    //IP Address
    $.ajax( "http://jsonip.com/" ).success(function(data){
        $("#ipinfo>div").html("<div>SainTfactor Studios</div><div style='position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%;'>" + data.ip + "</div>");
    });
});