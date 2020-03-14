var canvas;   // The canvas that is used as the drawing surface
var graphics; // The 2D graphics context for drawing on the canvas.


var swedishflagbg = new Image();
swedishflagbg.src = "445409.jpg";
swedishflagbg.onload = function() {
    game_context.drawImage(swedishflagbg, 0, 0);
};


var X_LEFT = -4;    // The xy limits for the coordinate system.
var X_RIGHT = 4;
var Y_BOTTOM = -3;
var Y_TOP = 3;

var BACKGROUND = "white";  // The display is filled with this color before the scene is drawn.

var pixelSize;  // The size of one pixel, in the transformed coordinates.

var frameNumber = 0;  // Current frame number. goes up by one in each frame.

// TODO:  Define any other necessary state variables.


var time = new Date();
var hours = time.getHours();
var minutes = time.getMinutes();
var seconds = time.getSeconds();




/**
 *  Responsible for drawing the entire scene.  The display is filled with the background
 *  color before this function is called.
 */
function drawWorld() {

    // TODO: Draw the content of the scene.
    rotatingRect();  // (DELETE THIS EXAMPLE)
    Clock;
}


function Clock() {
    var secondsRotateSpeed = Math.PI/30

}

/**
 * This method is called just before each frame is drawn.  It updates the modeling
 * transformations of the objects in the scene that are animated.
 */
function updateFrame() {
    frameNumber++;

    // TODO: If other updates are needed for the next frame, do them here.
}


// TODO: Define methods for drawing the objects in the scene.

function rotatingRect() { // (DELETE THIS EXAMPLE)
    graphics.save();  // (It might be necessary to save/restore transform and color)
    graphics.fillStyle = "red";
    graphics.rotate( (frameNumber*.75) * Math.PI/180 );
    graphics.scale( 2, 2 );
    filledRect();
    graphics.restore();
}


//------------------- Some methods for drawing basic shapes. ----------------

function line() { // Draws a line from (-0.5,0) to (0.5,0)
    graphics.beginPath();
    graphics.moveTo(-0.5,0);
    graphics.lineTo(0.5,0);
    graphics.stroke();
}

function rect() { // Strokes a square, size = 1, center = (0,0)
    graphics.strokeRect(-0.5,-0.5,1,1);
}

function filledRect() { // Fills a square, size = 1, center = (0,0)
    graphics.fillRect(-0.5,-0.5,1,1);
}

function circle() { // Strokes a circle, diameter = 1, center = (0,0)
    graphics.beginPath();
    graphics.arc(0,0,0.5,0,2*Math.PI);
    graphics.stroke();
}

function filledCircle() { // Fills a circle, diameter = 1, center = (0,0)
    graphics.beginPath();
    graphics.arc(0,0,0.5,0,2*Math.PI);
    graphics.fill();
}

function filledTriangle(g2) {// Filled Triangle, width 1, height 1, center of base at (0,0)
    g2.beginPath();
    g2.moveTo(-0.5,0);
    g2.lineTo(0.5,0);
    g2.lineTo(0,1);
    g2.closePath();
    g2.fill();
}




// ------------------------------- graphics support functions --------------------------

/**
 * Draw one frame of the animation.  Probably doesn't need to be changed,
 * except maybe to change the setting of preserveAspect in applyLimits().
 */
function draw() {
    graphics.save();  // to make sure changes don't carry over from one call to the next
    graphics.fillStyle = BACKGROUND;  // background color
    graphics.fillRect(0,0,canvas.width,canvas.height);
    graphics.fillStyle = "black";
    applyLimits(graphics,X_LEFT,X_RIGHT,Y_TOP,Y_BOTTOM,false);
    graphics.lineWidth = pixelSize;  // Use 1 pixel as the default line width
    drawWorld();
    graphics.restore();
}

/**
 * Applies a coordinate transformation to the graphics context, to map
 * xleft,xright,ytop,ybottom to the edges of the canvas.  This is called
 * by draw().  This does not need to be changed.
 */
function applyLimits(g, xleft, xright, ytop, ybottom, preserveAspect) {
    var width = canvas.width;   // The width of this drawing area, in pixels.
    var height = canvas.height; // The height of this drawing area, in pixels.
    if (preserveAspect) {
        // Adjust the limits to match the aspect ratio of the drawing area.
        var displayAspect = Math.abs(height / width);
        var requestedAspect = Math.abs(( ybottom-ytop ) / ( xright-xleft ));
        var excess;
        if (displayAspect > requestedAspect) {
            excess = (ybottom-ytop) * (displayAspect/requestedAspect - 1);
            ybottom += excess/2;
            ytop -= excess/2;
        }
        else if (displayAspect < requestedAspect) {
            excess = (xright-xleft) * (requestedAspect/displayAspect - 1);
            xright += excess/2;
            xleft -= excess/2;
        }
    }
    var pixelWidth = Math.abs(( xright - xleft ) / width);
    var pixelHeight = Math.abs(( ybottom - ytop ) / height);
    pixelSize = Math.min(pixelWidth,pixelHeight);
    g.scale( width / (xright-xleft), height / (ybottom-ytop) );
    g.translate( -xleft, -ytop );
}


//------------------ Animation framework ------------------------------

var running = false;  // This is set to true when animation is running

function frame() {
    if (running) {
        // Draw one frame of the animation, and schedule the next frame.
        updateFrame();
        draw();
        requestAnimationFrame(frame);
    }
}

function doAnimationCheckbox() {
    var shouldRun = document.getElementById("animateCheck").checked;
    if ( shouldRun != running ) {
        running = shouldRun;
        if (running)
            requestAnimationFrame(frame);
    }
}

//----------------------- initialization -------------------------------

function init() {
    canvas = document.getElementById("thecanvas");
    if (!canvas.getContext) {
        document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
        return;
    }
    graphics = canvas.getContext("2d");
    document.getElementById("animateCheck").checked = false;
    document.getElementById("animateCheck").onchange = doAnimationCheckbox;
    draw();
}
