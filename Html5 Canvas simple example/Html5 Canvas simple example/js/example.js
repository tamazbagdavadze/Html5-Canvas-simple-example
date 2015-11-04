
var example = function() {

    "use strict";

    var coordinates = function(x, y) {
        this.x = x;
        this.y = y;
    }

    var domelement;
    var ctx;

    var ctxHeight;
    var ctxWidth;

    var center1;
    var center2;

    var initialRadius;

    var animationDelay = 50;

    function drawCircle(crd, radius) {

        ctx.beginPath();

        ctx.arc(crd.x, crd.y, radius, 0, Math.PI * 2, true);

        ctx.stroke();
    }

    function clearScreen() {
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    }

    function drawShape(crds) {
        for (let i = 0; i < initialRadius; i+=2) {
            drawCircle(crds, i);
        }
    }

    function render() {
        drawShape(center1, initialRadius);
        drawShape(center2, initialRadius);
    }

    function startAnimation() {
        
        setTimeout(function () {

            clearScreen();
            render();

            if (center1.x === center2.x) {
                return;
            }

            center1.x += 2;
            center2.x -= 2;

            startAnimation();

        }, animationDelay);
    }

    return {
        init : function(element) {
            domelement = element;
            ctx = domelement.getContext("2d");

            ctx.fillStyle = "black";

            ctxHeight = element.height;
            ctxWidth = element.width;

            center1 = new coordinates(ctxHeight / 2, ctxHeight / 2);
            center2 = new coordinates(ctxWidth - (ctxHeight / 2), ctxHeight / 2);
            initialRadius = ctxHeight / 2;

            startAnimation();
        }
    };
}();