$(function(){	
    var oneInterval;
    var twoInterval;
	var SportsArray = [];
    
    function GetSports()
    {
        //IP Address
        $.ajax( "http://api.reddit.com/r/cfb/hot?limit=100" ).success(function(data){
			$.each(data.data.children, function(i, val){
				SportsArray.push({ thumbnail: val.data.thumbnail, title: val.data.title });
			});

			cycleSports();
        });
    }
    
    function cycleSports()
    {
		// change the sports feed
		var displayNum = Math.floor((Math.random() * SportsArray.length));
		
		if(SportsArray[displayNum].thumbnail.indexOf("//") != -1)
		{
        	$("#sports>div").html("<img src='" + SportsArray[displayNum].thumbnail + "' style='display:inline; width:40%; height:40%; padding:10px 10px 0 0; float:left;' />" + "<div style=\"height:100%\">" + "<span style='display:inline;'>" + SportsArray[displayNum].title + "</span>" + "</div>");
		}
		else
		{
        	$("#sports>div").html("<div style=\"height:100%\">" + "<span style='display:inline;'>" + SportsArray[displayNum].title + "</span>" + "</div>");
		}

        fixFontSize();

        clearInterval(twoInterval);
        twoInterval = setInterval(function(){ cycleSports(); }, 60000); 
    }


    $(window).on("resize", fixFontSize);
    function fixFontSize()
    {
        $("#sports>div>div").textfill({ maxFontPixels: 0 });
    }
    
    function advanceToNext()
    {
        GetSports();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    advanceToNext();
});
