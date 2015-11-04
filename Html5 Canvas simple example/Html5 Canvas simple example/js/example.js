
var Example = function() {

    "use strict";

    var coordinates = function(x, y) {
        this.x = x;
        this.y = y;
    }

    var domElement;
    var ctx;

    var ctxHeight;
    var ctxWidth;

    var center1;
    var center2;

    var initialRadius;

    var animationDelay = 50;
    var stepSize = 2;

    var currentRenderTimeOutId;

    function clearScreen() {
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    }

    function drawCircle(crds, radius) {

        ctx.beginPath();
        ctx.arc(crds.x, crds.y, radius, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    /**
     * draws circle with inner circles
     * @param {} crds 
     * @returns {} 
     */
    function drawShape(crds) {
        for (let i = 0; i < initialRadius; i += 2) {
            drawCircle(crds, i);
        }
    }

    /**
     * main draw function
     * @returns {} 
     */
    function drawFull() {
        drawShape(center1, initialRadius);
        drawShape(center2, initialRadius);
    }

    function render() {

        currentRenderTimeOutId = setTimeout(function() {

            clearScreen();
            drawFull();

            if (center1.x === center2.x) {
                
                currentRenderTimeOutId = null;
                return;
            }

            center1.x += stepSize;
            center2.x -= stepSize;

            render();

        }, animationDelay);
    }

    function stopRender() {
        clearTimeout(currentRenderTimeOutId);
    }

    function reset(width, height) {
        ctxHeight = height;
        ctxWidth = width;

        center1 = new coordinates(ctxHeight / 2, ctxHeight / 2);
        center2 = new coordinates(ctxWidth - (ctxHeight / 2), ctxHeight / 2);
        initialRadius = ctxHeight / 2;
    }

    function sizeChangedHandler(e) {

        stopRender();

        var width = parseInt(e.target.value, 10) * 100;
        width -= width % 100;

        var height = width / 2;
        height -= height % 100;

        domElement.setAttribute("height",  height + "px");
        domElement.setAttribute("width", width + "px");

        reset(width, height);

        render();
    }

    function speedChangedHandler(e) {
        stopRender();
        animationDelay = 100 - parseInt(e.target.value, 10);
        render();
    }

    return {
        init: function(element) {
            domElement = element;
            ctx = domElement.getContext("2d");
            ctx.fillStyle = "black";
            reset(element.width, element.height);

            render();
        },
        registerSizeChangedEventTriggerDomElement: function(element) {
            element.addEventListener("change", sizeChangedHandler);
            element.addEventListener("input", sizeChangedHandler);
        },
        registerSpeedChangedEventTriggerDomElement: function(element) {
            element.addEventListener("change", speedChangedHandler);
            element.addEventListener("input", speedChangedHandler);
        }
    };
}();