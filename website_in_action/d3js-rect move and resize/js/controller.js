/*
 * Suo Tan
 * Ruiyi Tech.
 * June, 2016
*/

var boxWidth = 1000;    // svg box width
var boxHeight = 600;    // svg box hei
var w = 350;    // rect width
var h = 200;    // rect height
var xx = 0;
var yy = 0;
var border = 3;
var iconsize = 16;
var bordercolor = "black";

var groups = ["Apple", "Samsung", "Huaweri", "LG"];


// declare drag and resize event
var drag = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", move);

var resize = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", dragResize);

/*  --------------------------------------------
*   Create the SVG box with boarder
*/
svgbox = d3.select("#svgdock").append("div").append("svg")
    .attr("width", boxWidth)
    .attr("height", boxHeight)
    .attr("border", border)
    .on("mousemove", function () {
        // show mouse coordinates on HTML text box
        var point = d3.mouse(this), p = {x: point[0], y: point[1] };
        TextX.value = d3.format("f")(p.x);
        TextY.value = d3.format("f")(p.y);
    });

svgbox.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", boxWidth)
    .attr("height", boxHeight)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);

// add svg rects matching the data in "groups"
charts = svgbox.selectAll("g.chart")
    .data(groups);

box = charts.enter()
    .append("g").classed("chart", true)
    .attr("id", function(d,i) { return "element"+i});



box.append("rect").classed("box", true)
    .attr("fill-opacity", .5)
    // .attr("y", function (d, i) { return i * 50; })
    .call(drag);

box.append("text").classed("legend", true).data(groups) // bind data to rect
box.append("rect").classed("icon", true) // apped the resizing icon
	.call(resize);

// put and style rect.box
box.selectAll("rect.box")
    .data([{x: 95, y: 10}])
    .attr({
        x: function(d) { return d.x; },
        y: function(d, i) { return d.y; },
        width: w,
        height: h,
    })

// put and style legend
box.selectAll("text.legend")
    .attr({
            x: 105,
            y: 30,
            width: 200,
            height: 25,
            fill: "#999999"
        })
    .text(function(d) {
        return d;
    })

// put and style dragging icon
box.selectAll("rect.icon")
	.data([{x: 429, y: 194}])
	.attr({
        x: function(d) { return d.x; },
    	y: function(d) { return d.y; },
        width: iconsize,
        height: iconsize,
		fill: "#999999"
    })

var dx = 429; // x + w
var dy = 194;

// implenent move event handler
function move(){
	 var dragTarget = d3.select(this); // rect.icon
	 var dragObject = d3.select(this.parentNode); //group

	 xx += d3.event.x - parseInt(dragTarget.attr("x"));
	 yy += d3.event.y - parseInt(dragTarget.attr("y"));

	 dragObject
	 	.attr("transform", "translate(" + xx + "," + yy + ")")
    console.log(" *** Item moved! ***");
};

// implenent resize event handler
function dragResize(){
    var dragx = Math.max(dx + (iconsize/2), Math.min(w, dx + w + d3.event.dx));
    var dragy = Math.max(dy + (iconsize/2), Math.min(h, dy + h + d3.event.dy));

    var dragTarget = d3.select(this);  // the drag icon
    var dragObject = d3.select(this.parentNode); //

    var rectbox = dragObject.select("rect.box");

    var oldx = dx;
    var oldy = dy;

    console.log("------- NEW STEP --------");

    console.log("original dx, dy - (dx:"+ dx +"; dy:"+ dy + ")");
    console.log("dragx, dragy - (dragx:" + dragx +"; dragy:" + dragy + ")");
    console.log("d3.event (dx:"+ d3.event.dx +"; dy:"+ d3.event.dy + ")");
    console.log("d3.event (x:" + d3.event.x + "; y:"+ d3.event.y + ")");

    dx = Math.max(0, Math.min(dx + w - (iconsize / 2), d3.event.x));
    dy = Math.max(0, Math.min(dy + h - (iconsize / 2), d3.event.y));
    w = w - (oldx - dx);
    h = h - (oldy - dy);

    console.log("UPDATED dx', dy' - (dx':"+ dx +"; dy':"+ dy + ")");
    console.log("UPDATED w, h - (w':"+ w +"; h':"+ h + ")");

    dragTarget
    .attr("x", function(d) { return dragx - (iconsize/2) })
    .attr("y", function(d) { return dragy - (iconsize/2) })

    rectbox.attr("width", w)
    .attr("height", h);

};
