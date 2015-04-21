$(function(){	
    var oneInterval;
    
    
    function advanceToNext()
    {
        GetWeather();    
        GetWeather3Day();
        
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 3600000);
    }
    
    function GetWeather()
    {
        //IP Address
        $.ajax( "http://api.openweathermap.org/data/2.5/weather?id=4830796" ).success(function(data){
			var day = "";

			day += "<div style=\"width:100%;\"><img src=\"" + getWeatherIconFromCodeAndIswindy(data.weather[0].id, data.wind.speed > 20) + "\" />";
			day += "<div style=\"top:4%;position:absolute;\">&nbsp;&nbsp;" + KelvinToFahrenheit(data.main.temp) + "&deg;</div></div>";

			day += "<div style=\"font-size:1.5vmin; display:inline-block; width:50%; text-align:left;\">Humidity</div><div style=\"font-size:1.5vmin; display:inline-block; width:50%; text-align:right;\">Wind Speed</div>";

			day += "<div style=\"display:inline-block; width:50%; text-align:left; font-size:4.8vmin;\">" + data.main.humidity + "%</div><div style=\"display:inline-block; width:50%; text-align:right; white-space: nowrap; font-size:4.8vmin;\">" + data.wind.speed + " mph</div>";

			$("#weathertop").html(day);
        });
    }

    function GetWeather3Day()
    {
        //IP Address
        $.ajax( "http://api.openweathermap.org/data/2.5/forecast/daily?id=4830796" ).success(function(data){
			var day1 = "";		
			var day2 = "";		
			var day3 = "";		

			day1 += "<img src=\"" + getWeatherIconFromCodeAndIswindy(data.list[1].weather[0].id, data.list[1].speed > 20) + "\" />";
			day2 += "<img src=\"" + getWeatherIconFromCodeAndIswindy(data.list[2].weather[0].id, data.list[2].speed > 20) + "\" />";
			day3 += "<img src=\"" + getWeatherIconFromCodeAndIswindy(data.list[3].weather[0].id, data.list[3].speed > 20) + "\" />";

			day1 += "<div>" + KelvinToFahrenheit(data.list[1].temp.min) + "&deg;-" + KelvinToFahrenheit(data.list[1].temp.max) + "&deg;</div>";	
			day2 += "<div>" + KelvinToFahrenheit(data.list[2].temp.min) + "&deg;-" + KelvinToFahrenheit(data.list[2].temp.max) + "&deg;</div>";	
			day3 += "<div>" + KelvinToFahrenheit(data.list[3].temp.min) + "&deg;-" + KelvinToFahrenheit(data.list[3].temp.max) + "&deg;</div>";		

            $("#weatherDay1").html(day1);
            $("#weatherDay2").html(day2);
            $("#weatherDay3").html(day3);

        });
    }

	function getWeatherIconFromCodeAndIswindy(code, isWindy)
	{
		var iconURL = "/PiDisplay/icons/flat_white/png/";
		switch (code) {
			case 200:
			case 210:
			case 221:
			case 230:
			case 231:
				iconURL += "37";
				break;
			case 201:
			case 202:
			case 211:
			case 212:
			case 232:
				iconURL += "04";
				break;
			case 300:
			case 301:
			case 302:
			case 310:
			case 311:
			case 312:
			case 313:
			case 314:
			case 321:
			case 500:
			case 520:
			case 531:
				iconURL += "11";
				break;
			case 501:
			case 502:
			case 503:
			case 504:
			case 520:
			case 521:
			case 522:
			case 531:
				if(isWindy) {
					iconURL += "01";
				} else {
					iconURL += "12";
				}
				break;
			case 511:
			case 615:
			case 616:
				iconURL += "05";
				break;		
			case 600:
			case 620:
				if(isWindy) {
					iconURL += "15";
				} else {
					iconURL += "13";
				}
				break;		
			case 601:
			case 621:
				if(isWindy) {
					iconURL += "15";
				} else {
					iconURL += "14";
				}
				break;		
			case 602:
			case 622:
				if(isWindy) {
					iconURL += "15";
				} else {
					iconURL += "16";
				}
				break;
			case 611:
			case 612:
				if(isWindy) {
					iconURL += "10";
				} else {
					iconURL += "08";
				}
				break;	
			case 701:
			case 711:
			case 721:
			case 731:
			case 741:
			case 751:
			case 761:
			case 762:
				iconURL += "20";
				break;
			case 771:
			case 781:
				iconURL += "00";
				break;
			case 800:
				iconURL += "32";
				break;
			case 801:
				iconURL += "30";
			case 802:
			case 803:
				iconURL += "28";
				break;
			case 804:
				iconURL += "26";
				break;
			case 900:
			case 901:
			case 902:
				iconURL += "00";
				break;
			case 903:
				iconURL += "41";
				break;
			case 904:
				iconURL += "36";
				break;
			case 905:
				iconURL += "23";
				break;
			case 906:
				iconURL += "43";
				break;
			case 951:
			case 952:
			case 953:
			case 954:
			case 955:
			case 956:
			case 957:
			case 958:
			case 959:
				iconURL += "23";
				break;
			case 960:
			case 961:
			case 962:
				iconURL += "00";
				break;
			default:
				iconURL += "na";
				break;
		}
		iconURL += ".png"

		return iconURL;
	}

	function KelvinToFahrenheit(kelvin){
		return Math.round(((kelvin - 273.15) * (9.0/5)) + 32);
	} 
    
    advanceToNext();
});














