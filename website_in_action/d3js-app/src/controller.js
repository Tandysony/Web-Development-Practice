/*
 * Suo Tan
 * Ruiyi Tech.
 * June, 2016
*/

var boxWidth = 1000;
var boxHeight = 600;
var padding = 20;
var border = 3;
var bordercolor = 'black';
var w = 100;// defaut rect width
var h= 60;  // defaut rect height
var r = 10; // defaut circle radius
var l = 100 // defaut line length
var iconsize = 16;
var elemtIndex = 0;
var xx = 0;
var yy = 0;


/* -------------------------------------------
 * Configure the menu content for contextMenu
*/
var menu = [
        {
            title: "Delete",
            action: function(elm, d, i) {
                console.log("You deleted an element");
                d3.select(elm.parentNode).remove();
            }
        },
        {
            title: "Add text",
            action: function(elm, d, i) {
                console.log('You chose to add text!');
                //TODO:  add text
            }
        }
    ]


/* -------------------------------------------
 * Create the SVG box with boarder
*/
var box = d3.select("#svgdock")
        .append("svg")
            .attr("class", "svgbox")
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .attr("border",border)
            .on("mousemove", function () {
                var point = d3.mouse(this), p = {x: point[0], y: point[1] };
                TextX.value = d3.format("f")(p.x); // format to integer
                TextY.value = d3.format("f")(p.y);
            })
            .on("click", click)
            .on("dblclick", dbClick);

// Draw the border of the SVG box
box.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("stroke", bordercolor)
        .style("fill", "none")
        .style("stroke-width", border);


/* -------------------------------------------
 * hide all dragging icons when clicking an
 * object without a dragging icon attached
*/
function click(){
    d3.selectAll(".icon").attr("visibility", "hidden");
}

/* -------------------------------------------
 * doubleclick to add a chosen svg shape
 * into the svg box
*/
function dbClick(){
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location
    var point = d3.mouse(this), p = {x: point[0], y: point[1] };

    var rLine = document.getElementById("LineRadio");
    var rCirlcle = document.getElementById("CircleRadio");
    //var rArc = document.getElementById("ArcRadio");
    var rRect = document.getElementById("RectRadio");


    if (rLine.checked == true)
    {
        // Append a line
        group = box.append("g")
            .attr("class", "lineGroup")
            .attr("id", function() { return "element "+ elemtIndex; });

        group.append("line")
            .attr("x1", p.x)
            .attr("y1", p.y)
            .attr("x2", p.x + 100)
            .attr("y2", p.y)
            .attr("class", "lines")
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
            .on("contextmenu", d3.contextMenu(menu))
            .on("click", function(){
                    // the svg box click listener will not fire
                    d3.event.stopPropagation()

                    d3.selectAll(".icon").attr("visibility", "hidden");
                    d3.select(this.parentNode).select("rect.icon")
                        .attr("visibility", "visible");
                  })
            .call(drag2move);

        group.append("rect")
            .attr("x", p.x + l - iconsize/2)
            .attr("y", p.y - iconsize/2)
            .attr("width", iconsize)
            .attr("height", iconsize)
            .attr("fill", "#999999")
            .attr("class", "icon")
            //.attr("id", function() { return "icon-"+ elemtIndex; }) // Create an id for text so we can select it later for removing on mouseout
            .call(resize);

        console.log("A line is added!");
    }
    else if (rCirlcle.checked == true)
    {
        // Append a circle
        group = box.append("g")
            .attr("class", "circleGroup")
            .attr("id", function() { return "element "+ elemtIndex; });

        group.append("circle")
            .attr("cx", p.x)
            .attr("cy", p.y)
            .attr("r", r)
            .attr("class", "circles")
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
            .on("contextmenu", d3.contextMenu(menu))
            .on("click", click)
            .call(drag2move);

        // group.append("rect")
        //     .attr("x", p.x + r - iconsize/2)
        //     .attr("y", p.y - iconsize/2)
        //     .attr("width", iconsize)
        //     .attr("height", iconsize)
        //     .attr("fill", "#999999")
        //     .attr("class", "icon")
        //     //.attr("id", function() { return "icon-"+ elemtIndex; }) // Create an id for text so we can select it later for removing on mouseout
        //     .call(resize);
        //
        //     dx = p.x + r - iconsize/2;
        //     dy = p.y - iconsize/2;
        //     elemtIndex++;
        //
        //     console.log("A circle is added!");
        //     console.log(" - p.x, p.y - (p.x:" + p.x +"; p.y:" + p.y + ")");
        //     console.log(" - Initial dx, dy - (dx:" + dx +"; dy:" + dy + ")");
    }
    // else if (rArc.checked == true)
    // {
    //     // to do
    //
    // }
    else if (rRect.checked == true)
    {
        // Append a rect
        group = box.append("g")
            .attr("class", "rectGroup")
            .attr("id", function() { return "element-"+ elemtIndex; });

        group.append("rect")
            .attr("x", p.x)
            .attr("y", p.y)
            .attr("width", w)
            .attr("height", h)
            .attr("class", "rects")
            // .on("mouseover", handleMouseOver)
            // .on("mouseout", handleMouseOut)
            .on("contextmenu", d3.contextMenu(menu))
            .on("click", function(){
                    // the svg box click listener will not fire
                    d3.event.stopPropagation();

                    d3.selectAll(".icon").attr("visibility", "hidden");
                    d3.select(this.parentNode).select("rect.icon")
                        .attr("visibility", "visible");
                  })
            .call(drag2move);

        group.append("rect")
            .attr("x", p.x + w - iconsize/2)
            .attr("y", p.y + h - iconsize/2)
            .attr("width", iconsize)
            .attr("height", iconsize)
            .attr("fill", "#999999")
            .attr("class", "icon")
            //.attr("id", function() { return "icon-"+ elemtIndex; }) // Create an id for text so we can select it later for removing on mouseout
            .call(resize);
    }

    elemtIndex++;
}

//
// // Implement the event handler for 'mouseover'
// function handleMouseOver() {
//
//     var object = d3.select(this);
//     // Use D3 to select element, change color
//     d3.select(this).style("fill", "gray");
// }
//
// // Implement the event handler for 'mouseout'
// function handleMouseOut() {
//     // Use D3 to select element, change color
//     d3.select(this).style("fill", "none");
// }


/* -------------------------------------------
 * Define drag2move behavior and its implementation
*/
var drag2move = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", move);

// implenent move event handler
function move() {
    d3.event.sourceEvent.stopPropagation();

    var dragTarget = d3.select(this);
    var dragObject = d3.select(this.parentNode); //group "g"
        // console.log("dragTarget:" + dragTarget);
        // console.log("dragObject:" + dragObject);
        // console.log("The shape class is: " + dragTarget.attr("class"));

    if (dragTarget.attr("class") == "lines")
    {
        xx += d3.event.x - dragTarget.attr("x");
        yy += d3.event.y - dragTarget.attr("y");

        console.log("you are moving a LINE");
    }
    else if (dragTarget.attr("class") == "circles")
    {
        xx += d3.event.x;
        yy += d3.event.y;

        console.log("you are moving a CIRCLE");
    }
    else if (dragTarget.attr("class") == "rects")
    {
        xx += d3.event.x - dragTarget.attr("x");
        yy += d3.event.y - dragTarget.attr("y");

        console.log("you are moving a RECT");
    }

    // console.log("shape at: (xx:" + xx +" yy:" + yy + ")");
    // console.log("mouse at: (.x:" + d3.event.x+" .y:"+ d3.event.y + ")");

    dragObject.attr("transform", "translate(" + xx + "," + yy + ")");
}


/* -------------------------------------------
 * Define resize behavior and its implementation
*/
var resize = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", dragResize);

// implenent resize event handler
function dragResize(){

    var dragTarget = d3.select(this);
    var dragObject = d3.select(this.parentNode); // "g"

    if (dragObject.attr("class") == "lineGroup")  // resizing a LINE
    {
        console.log("------- Dragging a LINE --------");
        console.log("  The element group #: " + dragObject.attr("id"));

        var obj2Resize = dragObject.select("line.lines");

        var objX1 = parseFloat(obj2Resize.attr("x1"));
        var objY1 = parseFloat(obj2Resize.attr("y1"));
        var objX2 = parseFloat(obj2Resize.attr("x2"));
        var objY2 = parseFloat(obj2Resize.attr("y2"));

        var dw = objX2 - objX1;
        var dh = objY2 - objY1;

        var deltaX = objX1 + dw - iconsize/2;
        var deltaY = objY1 + dh - iconsize/2;

        var oldx = deltaX;
        var oldy = deltaY;
        //
        // console.log("  OLD oldx,oldy (dx:"+ oldx +"; dy:"+ oldy + ")");
        // console.log("  OLD w,h (dw:"+ dw +"; dh:"+ dh  + ")");

        deltaX = Math.max(0, Math.min(deltaX + objX1 - (iconsize / 2), d3.event.x));
        deltaY= Math.max(0, Math.min(deltaY + objY1 - (iconsize / 2), d3.event.y));
        dw = dw - (oldx - deltaX);
        dh = dh - (oldy - deltaY);

        var dragx = Math.max(deltaX + (iconsize/2), Math.min(dw, deltaX + dw + d3.event.dx));
        var dragy = Math.max(deltaY + (iconsize/2), Math.min(dh, deltaY + dh + d3.event.dy));
        //
        // console.log("  NEW deltaX,deltaY (deltaX:"+ deltaX +"; deltaY:"+ deltaY  + ")");
        // console.log("  NEW dw,dh (dw:"+ dw +"; dh:"+ dh  + ")");
        // console.log("  dragx, dragy - (dragx:" + dragx +"; dragy:" + dragy + ")");

        dragTarget.attr("x", function(d) { return dragx - (iconsize/2) })
            .attr("y", function(d) { return dragy - (iconsize/2) })

        console.log("  ICON new position (x:"+ dragTarget.attr("x") +"; y:"+ dragTarget.attr("y") + ")");


        obj2Resize.attr("x2", dragx)
            .attr("y2", dragy);
    }
    else if (dragObject.attr("class") == "rectGroup") // resizing a RECT
    {
        console.log("------- Resizing a RECT --------");

        var obj2Resize = dragObject.select("rect.rects");
        console.log(" The element group #: " + dragObject.attr("id"));
        //
        // var myTrans = dragObject.attr("transform");
        // var tansValue = d3.transform(myTrans).translate;  //returns [x, y]

        var dw = parseFloat(obj2Resize.attr("width"));
        var dh = parseFloat(obj2Resize.attr("height"));

        var objX = parseFloat(obj2Resize.attr("x"));
        var objY = parseFloat(obj2Resize.attr("y"));

        var deltaX = objX + dw - iconsize/2;
        var deltaY = objY + dh - iconsize/2;

        var oldx = deltaX;
        var oldy = deltaY;

        console.log("  OLD oldx,oldy (dx:"+ oldx +"; dy:"+ oldy + ")");
        console.log("  OLD w,h (dw:"+ dw +"; dh:"+ dh  + ")");

        deltaX = Math.max(0, Math.min(deltaX + dw - (iconsize / 2), d3.event.x));
        deltaY= Math.max(0, Math.min(deltaY + dh - (iconsize / 2), d3.event.y));
        dw = dw - (oldx - deltaX);
        dh = dh - (oldy - deltaY);

        var dragx = Math.max(deltaX + (iconsize/2), Math.min(dw, deltaX + dw + d3.event.dx));
        var dragy = Math.max(deltaY + (iconsize/2), Math.min(dh, deltaY + dh + d3.event.dy));

        console.log("  NEW deltaX,deltaY (deltaX:"+ deltaX +"; deltaY:"+ deltaY  + ")");
        console.log("  NEW dw,dh (dw:"+ dw +"; dh:"+ dh  + ")");
        console.log("  dragx, dragy - (dragx:" + dragx +"; dragy:" + dragy + ")");

        dragTarget.attr("x", function(d) { return dragx - (iconsize/2) })
            .attr("y", function(d) { return dragy - (iconsize/2) })

        console.log("  ICON new position (x:"+ dragTarget.attr("x") +"; y:"+ dragTarget.attr("y") + ")");

        obj2Resize.attr("width", dw)
            .attr("height", dh);
    }


}
