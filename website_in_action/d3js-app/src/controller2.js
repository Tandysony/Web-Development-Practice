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
var r = 10; // defaut circle/sensor radius
var l = 100 // defaut line length
var iconsize = 16;
var elemtIndex = 0;
var xx = 0;
var yy = 0;
var dx = 0;
var dy = 0;
var dragable = false;

// var contextMenu = {
// 				title: 'Item #1',
// 				action: function(elm, d, i) {
// 					console.log('Item #1 clicked!');
// 					console.log('The data for this circle is: ' + d);
// 				}
// 			}

var contextmenu = [
	{
		title: 'Remove this item!',
		action: function(elm, d, i) {

			if (d.parent) {

			  // find child and remove it
			  for (var ii = 0; ii < d.parent.children.length; ii++) {
			    if (d.parent.children[ii].name === d.name) {
			      d.parent.children.splice(ii, 1);
			      break;
			    }
			  }
			}

			update(d);
		}
	}
];



var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);


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
            .on("dblclick", dbClick)
            .call(zoom);

var container = box.append("g");

container.append("g")
    .attr("class", "x axis")
  .selectAll("line")
    .data(d3.range(0, boxWidth, 10))
  .enter().append("line")
    .attr("x1", function(d) { return d; })
    .attr("y1", 0)
    .attr("x2", function(d) { return d; })
    .attr("y2", boxHeight);

container.append("g")
    .attr("class", "y axis")
  .selectAll("line")
    .data(d3.range(0, boxHeight, 10))
  .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function(d) { return d; })
    .attr("x2", boxWidth)
    .attr("y2", function(d) { return d; });



// Draw the border of the SVG box
box.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("stroke", bordercolor)
        .style("fill", "none")
        .style("stroke-width", border);


function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


function dbClick(){
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location\
    var point = d3.mouse(this), p = {x: point[0], y: point[1] };

    var rLine = document.getElementById("LineRadio");
    var rCirlcle = document.getElementById("CircleRadio");
    //var rArc = document.getElementById("ArcRadio");
    var rRect = document.getElementById("RectRadio");


    if (rLine.checked == true)
    {
		// Append a line
        group = container.append("g")
            .attr("class", "elegroup")
            .attr("id", function() { return "element "+ elemtIndex; });

        group.append("line")
            .attr("x1", p.x)
            .attr("y1", p.y)
            .attr("x2", p.x + 100)
            .attr("y2", p.y)
            .attr("class", "lines")
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
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
        group = container.append("g")
            .attr("class", "elegroup")
            .attr("id", function() { return "element "+ elemtIndex; });

        group.append("circle")
            .attr("cx", p.x)
            .attr("cy", p.y)
            .attr("r", r)
            .attr("class", "circles")
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
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
        //     dy = p.y + - iconsize/2;
        //     elemtIndex++;
        //
        //     console.log("An circle is added!");
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
        group = container.append("g")
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

            dx = p.x + w - iconsize/2;
            dy = p.y + h - iconsize/2;
            elemtIndex++;

            console.log("An rect is added!");
            console.log(" - p.x, p.y - (p.x:" + p.x +"; p.y:" + p.y + ")");
            console.log(" - Initial dx, dy - (dx:" + dx +"; dy:" + dy + ")");

    }

	elemtIndex++;
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
    console.log(" *** Item moved! ***");
}


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
    var o = dragObject.select("rect.rects");
    //
    // var myTrans = dragObject.attr("transform");
    // var tansValue = d3.transform(myTrans).translate;  //returns [x, y]

    console.log("------- NEW STEP --------");

    var dragx = Math.max(dx + (iconsize/2), Math.min(w, dx + w + d3.event.dx));
    var dragy = Math.max(dy + (iconsize/2), Math.min(h, dy + h + d3.event.dy));

    console.log(" original dx, dy - (dx:"+ dx +"; dy:"+ dy + ")");
    console.log(" dragx, dragy - (dragx:" + dragx +"; dragy:" + dragy + ")");

    var oldx = dx;
    var oldy = dy;

    dx = Math.max(0, Math.min(dx + w - (iconsize / 2), d3.event.x));
    dy = Math.max(0, Math.min(dy + h - (iconsize / 2), d3.event.y));
    w = w - (oldx - dx);
    h = h - (oldy - dy);


    console.log(" NEW dx,dy (dx:"+ dx +"; dy:"+ dy  + ")");
    console.log(" NEW w,h (w:"+ w +"; h:"+ h  + ")");


    dragTarget
    .attr("x", function(d) { return dragx - (iconsize/2) })
    .attr("y", function(d) { return dragy - (iconsize/2) })

    console.log(" ICON new position (x:"+ dragTarget.attr("x") +"; y:"+ dragTarget.attr("y") + ")");

    o.attr("width", w)
        .attr("height", h);

}
