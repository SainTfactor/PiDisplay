$(function(){            
    var currentVerseName = "";
    var currentVerseNumber = "";
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

        $.ajax({ url: "https://getbible.net/json?p=" + encodeURIComponent(currentVerseName) + "&v=nasb", type: "GET", data: {} }).done(function(data){
            var removedhtml = data.results[0].split("<body>")[1].split("</body>")[0];
            var jsonParsed = $.parseJSON(removedhtml.substring(1, removedhtml.length - 2))
            $("#bibleverse>div").html("<span style=\"height:100%\">" + jsonParsed.book[0].chapter["" + versenumber].verse + "<br>-" + currentVerseName + " (NASB)</span>");

            fixFontSize();
        });
    });

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
        //$("#bibleverse").css("line-height", ($("#bibleverse").height()/countLines("bibleverse")) + "px");
        //$("#bibleverse").css("text-align", "left");

        //alert("stuff");
        $("#bibleverse>div").textfill({ maxFontPixels: 0 });
    }
});