

window.onload = function () {

    var canvas = document.getElementById("canvas1");
    var sizeModifier = document.getElementById("sizeModifier");
    var speedModifier = document.getElementById("speedModifier");

    Example.registerSizeChangedEventTriggerDomElement(sizeModifier);
    Example.registerSpeedChangedEventTriggerDomElement(speedModifier);

    Example.init(canvas);
}