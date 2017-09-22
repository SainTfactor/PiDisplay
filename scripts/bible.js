$(function(){            
    var currentVerseName = "";
    var currentVerseNumber = "";
    var oneInterval;
    
    function GetNewBibleVerse(){
        $.ajax("./verseNumbers.json").success(function(data){
            var minutesinyear = 525949;
            var totalNumberOfVerses = 31102;			
            var minutesToShowVerse = minutesinyear/totalNumberOfVerses;

            var currentDate = new Date();
            var currentDay = getDayFromDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0)) + 1;
            var minutesElapsed = ((currentDay - 1) * 1440) + ((currentDate).getHours() * 60) + (currentDate).getMinutes();

            var verseNeeded = Math.floor(minutesElapsed/minutesToShowVerse);
            currentVerseNumber = verseNeeded;

            var bookname = "";				
            var chapternumber = 0;				
            var versenumber = 0;

            var done = false;
            $.each(data.books, function(i1, val1){
                if(verseNeeded - val1.verses > 0){
                    verseNeeded = verseNeeded - val1.verses;
                }
                else if(!done){
                    bookname = val1.name;
                    $.each(val1.chapterverses, function(i2, val2){
                        if(verseNeeded - val2 > 0){
                            verseNeeded = verseNeeded - val2;
                        }
                        else if(!done){
                            chapternumber = i2;
                            versenumber = verseNeeded;
                            done = true;
                        }
                    });
                }
            });

            currentVerseName = (bookname + " " + chapternumber + ":" + versenumber);
            console.log("https://getbible.net/json?p=" + encodeURIComponent(currentVerseName));
            $.getJSON("https://getbible.net/json?p=" + encodeURIComponent(currentVerseName) + "&callback=?", {}, function(jsonParsed){
                $("#bibleverse>div").html("<span style=\"height:100%\">" + jsonParsed.book[0].chapter["" + versenumber].verse + "<br>-" + currentVerseName + " (NASB)</span>");

                fixFontSize();                
            });
        });
    }

    //Helper Methods
    function getDayFromDate(now){
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }						

    $(window).on("resize", fixFontSize);
    function fixFontSize()
    {
        $("#bibleverse>div").textfill({ maxFontPixels: 0 });
    }
    
    function advanceToNext()
    {
        var minutesinyear = 525949;
        var totalNumberOfVerses = 31102;			
        var minutesToShowVerse = minutesinyear/totalNumberOfVerses;

        var currentDate = new Date();
        var currentDay = getDayFromDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0)) + 1;
        var minutesElapsed = ((currentDay - 1) * 1440) + ((currentDate).getHours() * 60) + (currentDate).getMinutes();

        var verseNeeded = Math.floor(minutesElapsed/minutesToShowVerse);
        
        if(currentVerseNumber != verseNeeded)
        {
            GetNewBibleVerse();
        }
        
        clearInterval(oneInterval);
        oneInterval = setInterval(function(){ advanceToNext(); }, 60000);
    }
    
    advanceToNext();
});