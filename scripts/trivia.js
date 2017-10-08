$(function(){	
    var oneInterval;
    var twoInterval;
	var TriviaArray = [];
    
    function GetTrivia()
    {
        //IP Address
        $.ajax( "http://api.reddit.com/r/todayilearned/?limit=100", dataType="jsonp" ).success(function(data){
			$.each(data.data.children, function(i, val){
				TriviaArray.push({ thumbnail: val.data.thumbnail, title: val.data.title });
			});

			cycleTrivia();
        });
    }
    
    function cycleTrivia()
    {
		// change the trivia feed
		var displayNum = Math.floor((Math.random() * TriviaArray.length));
		
		if(TriviaArray[displayNum].thumbnail.indexOf("//") != -1)
		{
        	document.getElementById("trivia").children[0].innerHTML = "<img src='" + TriviaArray[displayNum].thumbnail + "' style='display:inline; width:40%; height:40%; padding:10px 10px 0 0; float:left;' />" + "<div style=\"height:100%\">" + "<span style='display:inline;'>" + cleanTitle(TriviaArray[displayNum].title) + "</span>" + "</div>";
		}
		else
		{
        	document.getElementById("trivia").children[0].innerHTML = "<div style=\"height:100%\">" + "<span style='display:inline;'>" + cleanTitle(TriviaArray[displayNum].title) + "</span>" + "</div>";
		}

        clearInterval(twoInterval);
        twoInterval = setInterval(function(){ cycleTrivia(); }, 60000);
      
        fixFontSize(); 
        setTimeout(function(){ fixFontSize(); }, 500);
        setTimeout(function(){ fixFontSize(); }, 3000);
        setTimeout(function(){ fixFontSize(); }, 6000);
        setTimeout(function(){ fixFontSize(); }, 9000);
    }
    
    function cleanTitle(title)
    {
        var retVal = title;
        
        if(retVal.substring(0,10).toLowerCase() == "til that, ")
        {
            retVal = retVal[10].toUpperCase() + retVal.substring(11);            
        }
        if(retVal.substring(0,9).toLowerCase() == "til that ")
        {
            retVal = retVal[9].toUpperCase() + retVal.substring(10);            
        }
        if(retVal.substring(0,7).toLowerCase() == "til of ")
        {
            retVal = retVal[7].toUpperCase() + retVal.substring(8);            
        }
        if(retVal.substring(0,10).toLowerCase() == "til about ")
        {
            retVal = retVal[10].toUpperCase() + retVal.substring(11);            
        }
        if(retVal.substring(0,6).toLowerCase() == "til — ")
        {
            retVal = retVal[6].toUpperCase() + retVal.substring(7);            
        }
        if(retVal.substring(0,5).toLowerCase() == "til— ")
        {
            retVal = retVal[5].toUpperCase() + retVal.substring(6);            
        }
        if(retVal.substring(0,6).toLowerCase() == "til – ")
        {
            retVal = retVal[6].toUpperCase() + retVal.substring(7);            
        }
        if(retVal.substring(0,5).toLowerCase() == "til– ")
        {
            retVal = retVal[5].toUpperCase() + retVal.substring(6);            
        }
        if(retVal.substring(0,6).toLowerCase() == "til - ")
        {
            retVal = retVal[6].toUpperCase() + retVal.substring(7);            
        }
        if(retVal.substring(0,5).toLowerCase() == "til- ")
        {
            retVal = retVal[5].toUpperCase() + retVal.substring(6);            
        }
        if(retVal.substring(0,5).toLowerCase() == "til: ")
        {
            retVal = retVal[5].toUpperCase() + retVal.substring(6);            
        }
        if(retVal.substring(0,5).toLowerCase() == "til, ")
        {
            retVal = retVal[5].toUpperCase() + retVal.substring(6);            
        }
        if(retVal.substring(0,4).toLowerCase() == "til ")
        {
            retVal = retVal[4].toUpperCase() + retVal.substring(5);            
        }
        
        return retVal;
    }

    $(window).on("resize", fixFontSize);
    function fixFontSize()
    { 
        $("#trivia>div>div").textfill({ maxFontPixels: Math.floor($("#trivia").css("width").split("px")[0]/12) });
    }
    
    function advanceToNext()
    {
        GetTrivia();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    advanceToNext();
});
