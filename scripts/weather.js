$(function(){	
    var oneInterval;
    
    function GetWeather()
    {
        //IP Address
        $.ajax( "http://api.openweathermap.org/data/2.5/weather?id=4830796" ).success(function(data){
			
            $("#weathertop").html(data.main.temp);
        });
    }

    function GetWeather3Day()
    {
        //IP Address
        $.ajax( "http://api.openweathermap.org/data/2.5/forecast/daily?id=4830796" ).success(function(data){
			var tempList = "";			

			tempList += data.list[0].temp.day + ", ";	
			tempList += data.list[0].temp.day + ", ";	
			tempList += data.list[0].temp.day;	

            $("#weatherbottom").html(tempList);
        });
    }
    
    function advanceToNext()
    {
        GetWeather();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    function advanceToNext3Day()
    {
        GetWeather3Day();
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 86400000);
    }
    
    advanceToNext();
    advanceToNext3Day();
});
