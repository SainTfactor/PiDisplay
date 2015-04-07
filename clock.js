var Phhht = window.Phhht || {};

(function ($) {
    "use strict";

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (cb) { setTimeout(cb, 1000 / 60); };
    }

    var $h = $("#hour");
    var $m = $("#minute");
    var $s = $("#second");

    function computeTimePositions($h, $m, $s) {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ms = now.getMilliseconds();
        var degS = (s * 6) + (6 / 1000 * ms);
        var degM = (m * 6) + (6 / 60 * s) + (6 / (60 * 1000) * ms);
        var degH = (h * 30) + (30 / 60 * m);

        $("#second").css({ "transform": "rotate(" + degS + "deg)" });
        $("#minute").css({ "transform": "rotate(" + degM + "deg)" });
        $("#hour").css({ "transform": "rotate(" + degH + "deg)" });
		
        window.requestAnimationFrame(function () {
            computeTimePositions($h, $m, $s);
        });
    }

    function setUpFace() {
        var x,
            fragment = document.createDocumentFragment();


        function getTick(n) {
            var tickClass = "smallTick",
                tickBox = $("<div class=\"faceBox\"></div>"),
                tick = $("<div></div>"),
                tickNum = "";

            if (n % 5 === 0) {
                tickClass = (n % 15 === 0) ? "largeTick" : "mediumTick";
                tickNum = $("<div class=\"tickNum\"></div>").text(n / 5).css({ "transform": "rotate(-" + (n * 6) + "deg)" });
                if (n >= 50) {
                    tickNum.css({ "left": "-0.3em" });
                }
            }


            tickBox.append(tick.addClass(tickClass)).css({ "transform": "rotate(" + (n * 6) + "deg)" });
            tickBox.append(tickNum);
            return tickBox;
        }

        for (x = 1; x <= 60; x += 1) {
            fragment.appendChild(getTick(x)[0]);
        }

        $("#clockrun").append(fragment);
    }

    function setSize() {
		var b = $("#clock"),
			w = (b.width() > b.height()) ? b.height() : b.width(),
			x = Math.floor(w / 30) - 1,
			px = (x > 15 ? 16 : x) + "px";
	 
        $("#clockrun").css({ "font-size": px });
    }

    Phhht.Clock = {
        setUp: function () {
            setSize();
            setUpFace();
            computeTimePositions($h, $m, $s);
            $(window).on("resize", setSize);
        }
    };
}(jQuery));
