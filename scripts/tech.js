$(function(){	
    var oneInterval;
    var twoInterval;
	var TechArray = [];
    
    function GetTech()
    {
        //IP Address
        $.ajax( "http://api.reddit.com/r/technews/hot?limit=100", dataType="jsonp" ).success(function(data){
			$.each(data.data.children, function(i, val){
				TechArray.push({ thumbnail: val.data.thumbnail, title: val.data.title });
			});

			cycleTechNews();
        });
    }
    
    function cycleTechNews()
    {
		// change the tech feed
		var displayNum = Math.floor((Math.random() * TechArray.length));
		
		if(TechArray[displayNum].thumbnail.indexOf("//") != -1)
		{
        	$("#technews>div").html("<img src='" + TechArray[displayNum].thumbnail + "' style='display:inline; width:40%; height:40%; padding:10px 10px 0 0; float:left;' />" + "<div style=\"height:100%\">" + "<span style='display:inline;'>" + TechArray[displayNum].title + "</span>" + "</div>");
		}
		else
		{
        	$("#technews>div").html("<div style=\"height:100%\">" + "<span style='display:inline;'>" + TechArray[displayNum].title + "</span>" + "</div>");
		}

        fixFontSize();

        clearInterval(twoInterval);
        twoInterval = setInterval(function(){ cycleTechNews(); }, 60000); 
    }


    $(window).on("resize", fixFontSize);
    function fixFontSize()
    {
        $("#technews>div>div").textfill({ maxFontPixels: Math.floor($("#technews").css("width").split("px")[0]/12) });
    }
    
    function advanceToNext()
    {
        GetTech();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    advanceToNext();
});
