$(function(){	
    var oneInterval;
    
    function GetIP()
    {
        //IP Address
        $.ajax( "http://jsonip.com/" ).success(function(data){
            //left: 50%; transform: translateX(-50%); width: 100%;
            $("#ipinfo>div").html("<div>SainTfactor Studios</div><div style='position: absolute; bottom: 0; width: 80%; text-align: center; margin-left: 10%; margin-right: 10%;'>" + data.ip + "</div>");
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