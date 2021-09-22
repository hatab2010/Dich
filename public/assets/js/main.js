

function flashIn(){
    $( "<div style='height: 0'></div>" ).eq(0).animate({
        height: "4",
    }, {
        duration: 2000,
        complete: flasOut,
        step: function( now, fx ) {
            var data = fx.elem.id + " " + fx.prop + ": " + now;
            $(".intensity").attr("slope", now)
        }
    });
}
function flasOut(){
    $( "<div style='height: 4px'></div>" ).eq(0).animate({
        height: "0",
    }, {
        duration: 2000,
        complete: flashIn,
        step: function( now, fx ) {
            var data = fx.elem.id + " " + fx.prop + ": " + now;
            $(".intensity").attr("slope", now)
        }
    });
}


let width = $("body").width();
let height = $("body").width();

$(window).resize(function(){
    width = $("body").width();
    height = $("body").height();
})

function transformRotation(){

    //perspective(2000px) rotatey(0deg) rotatex(0deg);
}

(function() {
    var mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 40); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {

            if (window.matchMedia("(max-width: 1200px)").matches) {
                $(".slider__content--transported").removeAttr("style");
            } else {
                const MAX_ROTATION = 1;
                let _xRotation;
                let _yRotation;

                let centerWidth = width/2;
                let centerHeight = height/2;

                _xRotation = (pos.x - centerWidth)/centerWidth * MAX_ROTATION;
                _yRotation = -(pos.y - centerHeight)/centerHeight * MAX_ROTATION;

                $(".slider__content--transported").css(
                    "transform", "perspective(400px) " +
                    "rotatey("+_xRotation+"deg) " +
                    "rotatex("+_yRotation+"deg)" +
                    "translateX("+(-_xRotation)/6+"%)" +
                    "translateY("+(_yRotation)/6+"%)"
                );
            }


        }
    }
})();

