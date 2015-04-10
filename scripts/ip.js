$(function(){	
    var oneInterval;
    
    function GetIP()
    {
        //IP Address
        $.ajax( "http://jsonip.com/" ).success(function(data){
            $("#ipinfo>div").html("<div>SainTfactor Studios</div><div style='position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%;'>" + data.ip + "</div>");
        });
    }
    
    function advanceToNext()
    {
        GetIP();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    advanceToNext();
});