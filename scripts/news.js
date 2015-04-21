$(function(){    
    var oneInterval;
    var mq;
    
    function GetNews()
    {
        $.ajax( "http://api.reddit.com/r/worldnews/hot?limit=100" ).success(function(data){
            var newsTicker = "";
            $.each(data.data.children, function(i, val){ newsTicker += val.data.title.substring(0, 100) + ((val.data.title.length > 100) ? "..." : "") + " &bull; "; });
            $("#ticker>div").html(newsTicker);    
            $("#ticker>div").marquee();
        });
    }
    
    function advanceToNext()
    {
        GetNews();
        
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    advanceToNext();
});