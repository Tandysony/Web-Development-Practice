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
var w = 100;
var h= 60;
var r = 30;
var iconsize = 16;
var elemtIndex = 0;
var xx = 0;
var yy = 0;
var dragable = false;


// var contextMenu = {
// 				title: 'Item #1',
// 				action: function(elm, d, i) {
// 					console.log('Item #1 clicked!');
// 					console.log('The data for this circle is: ' + d);
// 				}
// 			}




// Create the SVG box with boarder
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


function dbClick(){
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location\
    var point = d3.mouse(this), p = {x: point[0], y: point[1] };

    var rLine = document.getElementById("LineRadio");
    var rCirlcle = document.getElementById("CircleRadio");
    var rArc = document.getElementById("ArcRadio");
    var rRect = document.getElementById("RectRadio");


    if (rLine.checked == true)
    {
        // to do
    }
    else if (rCirlcle.checked == true)
    {
        // Append a circle
        group = box.append("g")
            .attr("class", "elegroup")
            .attr("id", function() { return "element "+ elemtIndex; });

        group.append("circle")
            .attr("cx", p.x)
            .attr("cy", p.y)
            .attr("r", r)
            .attr("class", "circles")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .call(drag2move);

        group.append("rect")
            .attr("x", p.x + r - iconsize/2)
            .attr("y", p.y - iconsize/2)
            .attr("width", iconsize)
            .attr("height", iconsize)
            .attr("fill", "#999999")
            .attr("class", "icon")
            //.attr("id", function() { return "icon-"+ elemtIndex; }) // Create an id for text so we can select it later for removing on mouseout
            .call(resize);


            elemtIndex++;
    }
    else if (rArc.checked == true)
    {
        // to do

    }
    else if (rRect.checked == true)
    {
        // Append a rect
        group = box.append("g")
            .attr("class", "elegroup")
            .attr("id", function() { return "element-"+ elemtIndex; });

        group.append("rect")
            .attr("x", p.x)
            .attr("y", p.y)
            .attr("width", w)
            .attr("height", h)
            .attr("class", "rects")
            .call(drag2move)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        group.append("rect")
            .attr("x", p.x + w - iconsize/2)
            .attr("y", p.y + h - iconsize/2)
            .attr("width", iconsize)
            .attr("height", iconsize)
            .attr("fill", "#999999")
            .attr("class", "icon")
            //.attr("id", function() { return "icon-"+ elemtIndex; }) // Create an id for text so we can select it later for removing on mouseout
            .call(resize);


        elemtIndex++;
    }

}


// Create Event Handlers for mouseover
function handleMouseOver() {

    var object = d3.select(this);
    // Use D3 to select element, change color
    d3.select(this).style("fill", "gray");
}


// Create Event Handlers for mouseout
function handleMouseOut() {
    // Use D3 to select element, change color
    d3.select(this).style("fill", "none");
}


// Define drag2move beavior
var drag2move = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", move);

function move(d) {
    var dragTarget = d3.select(this);
    var dragObject = d3.select(this.parentNode); //group
        // console.log("dragTarget:" + dragTarget);
        // console.log("dragObject:" + dragObject);
        // console.log("The shape class is: " + dragTarget.attr("class"));

        if (dragTarget.attr("class") == "circles")
        {
            xx += d3.event.x;
            yy += d3.event.y;

            console.log("you are moving CIRCLE");
        }
        else if (dragTarget.attr("class") == "rects")
        {
            xx += d3.event.x - dragTarget.attr("x");
            yy += d3.event.y - dragTarget.attr("y");

            console.log("you are moving RECT");
        }

        // console.log("shape at: (xx:" + xx +" yy:" + yy + ")");
        // console.log("mouse at: (.x:" + d3.event.x+" .y:"+ d3.event.y + ")");

    dragObject.attr("transform", "translate(" + xx + "," + yy + ")");

}


var resize = d3.behavior.drag()
    // .origin(function() {
    //     var current = d3.select(this);
    //     return {x: current.attr("x"), y: current.attr("y") };
    // })
    .on("drag", dragResize);


// charts = box.selectAll("rects")
//
// box = charts.enter()
//     .append("g").classed("chart", true)
//     .attr("id", function(d,i) { return "box"+i})



// implenent resize event handler
function dragResize(){

    var dragTarget = d3.select(this);
    var dragObject = d3.select(this.parentNode); // "g"
    var o = dragObject.select("rect.rects");

    var myTrans = dragObject.attr("transform");
    var tansValue = d3.transform(myTrans).translate;  //returns [x, y]

    console.log("------- NEW STEP --------");
    console.log(tansValue);

    // absIconPx = dragTarget.attr("x") + iconsize/2
    // absIconPx = dragTarget.attr("x") + iconsize/2

    var dx = d3.event.x - dragTarget.attr("x");
    var dy = d3.event.y - dragTarget.attr("y");
    //     
    // var dx = d3.event.x - tansValue[0] - dragTarget.attr("x");
    // var dy = d3.event.y - tansValue[1] - dragTarget.attr("y");

    // // for debug purpose
    console.log("diff (dx:"+ dx +"; dy:"+ dy  + ")");
    console.log("d3.event (x:" + d3.event.x + "; y:"+ d3.event.y  + ")");

    // console.log("dragTarget:" + dragTarget);
    // console.log("dragObject:" + dragObject);
    // console.log("The shape class is: " + dragTarget.attr("class"));

    // console.log("dragx:" + dragx +"; dragy:" + dragy);
    // console.log("dx,dy (dx:"+ dx +"; dy:"+ dy  + ")");
    // console.log("d3.event (dx:"+ d3.event.dx +"; dy:"+ d3.event.dy  + ")");
    // console.log("d3.event (x:" + d3.event.x + "; y:"+ d3.event.y  + ")");
    // console.log(dragObject.attr("class")); // will print elegroup
    // console.log(o.attr("class")); // will print rects
    // console.log(dragTarget.attr("class")); // will print icon
    // console.log("dragTarget (x:" + dragTarget.attr("x") + ", y:" + + dragTarget.attr("y") + ")");

    // var oldx = dx;
    // var oldy = dy;
    //
    // dx = Math.max(0, Math.min(dx + w - (iconsize / 2), d3.event.x));
    // dy = Math.max(0, Math.min(dy + h - (iconsize / 2 ), d3.event.y));
    w += dx;
    h += dy;

    console.log(" NEW dx,dy (dx:"+ dx +"; dy:"+ dy  + ")");
    console.log(" NEW w,h (w:"+ w +"; h:"+ h  + ")");

    dragTarget
        .attr("x", function() { return dragTarget.attr("x") + dx; })
        .attr("y", function() { return dragTarget.attr("y") + dy; })


    console.log(" ICON new position (x:"+ dragTarget.attr("x") +"; y:"+ dragTarget.attr("y") + ")");

    o.attr("width", w)
        .attr("height", h);

};
