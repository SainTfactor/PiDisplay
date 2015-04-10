$(function(){

    //Ticker
    $.ajax( "http://api.reddit.com/r/worldnews/hot?limit=100" ).success(function(data){
        var newsTicker = "";
        $.each(data.data.children, function(i, val){ newsTicker += val.data.title.substring(0, 100) + ((val.data.title.length > 100) ? "..." : "") + " &bull; "; });
        $("#ticker>div").html("<marquee scrollamount='9'>" + newsTicker + "</marquee>");
    });
});