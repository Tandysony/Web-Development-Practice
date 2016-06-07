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
var iconsize = 10;
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
        .attr("class", "box")
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("border",border)
        .on("mousemove", function () {
            var point = d3.mouse(this), p = {x: point[0], y: point[1] };
            TextX.value = d3.format("f")(p.x); // format to integer
            TextY.value = d3.format("f")(p.y);
        })
        .on("click", click);

// Draw the border of the SVG box
box.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("stroke", bordercolor)
        .style("fill", "none")
        .style("stroke-width", border);


function click(){
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location\
    var point = d3.mouse(this), p = {x: point[0], y: point[1] };

    var r1 = document.getElementById("LineRadio");
    var r2 = document.getElementById("CircleRadio");
    var r3 = document.getElementById("ArcRadio");
    var r4 = document.getElementById("RectRadio");


    if (r1.checked == true)
    {
        // to do
    }
    else if (r2.checked == true)
    {
        // Append a circle
        box.append("g")
            .attr("class", "charts")
            .attr("id", function() { return "element "+ elemtIndex; })
            .append("circle")
                .attr("transform", "translate(" + p.x + "," + p.y + ")")
                .attr("r", r)
                .attr("class", "circles")
              //.on("contextmenu", munuHandler)
                .call(drag2move);

        box.append("rect")
            //.attr("transform", "translate(" + p.x + "," + p.y + ")")
            .attr("x", p.x + r - iconsize/2)
            .attr("y", p.y - iconsize/2)
            .attr("width", iconsize)
            .attr("height", iconsize)
            .attr("fill", "#999999")
            .attr("class", "icon")
            .call(resize);

            elemtIndex++;
    }
    else if (r3.checked == true)
    {
        // to do

    }
    else if (r4.checked == true)
    {
        // Append a rect
        box.append("g")
            .attr("class", "charts")
            .attr("id", function() { return "element "+ elemtIndex; })
            .append("rect")
                // .attr("transform", "translate(" + p.x + "," + p.y + ")")
                .attr("x", p.x)
                .attr("y", p.y)
                .attr("width", w)
                .attr("height", h)
                .attr("class", "rects")
                .call(drag2move)
                //.on("mouseover", handleMouseOver)
                .on("mouseover", function () {
                    // Ignore the click event if it was suppressed
                    if (d3.event.defaultPrevented) return;

                    // var object = d3.select(this);
                    // Use D3 to select element, change color
                    d3.select(this).style("fill", "orange");

                    //console.log("rect (x:" + object.attr("x") + ", y:" + object.attr("y") + ")");

                    box.append("circle")
                       //.attr("transform", "translate(" + p.x + "," + p.y + ")")
                       .attr("cx", p.x + w)
                       .attr("cy", p.y + h)
                       .attr("r", iconsize)
                       .attr("fill", "none")
                       .attr("class", "icon")
                        .attr("id", "icon" + "-" + elemtIndex) // Create an id for text so we can select it later for removing on mouseout
                       .call(resize);
                })
                .on("mouseout", function () {

                    // // Ignore the click event if it was suppressed
                    // if (d3.event.defaultPrevented) return;
                    // Use D3 to select element, change color
                    d3.select(this).style("fill", "none");
                    // Select icon by id and then remove
                    d3.select("#icon" + "-" + elemtIndex).remove();  // Remove text location
                });



        // box.append("rect")
        //     //.attr("transform", "translate(" + p.x + "," + p.y + ")")
        //     .attr("x", p.x + w - iconsize)
        //     .attr("y", p.y + h - iconsize)
        //     .attr("width", iconsize)
        //     .attr("height", iconsize)
        //     .attr("fill", "#999999")
        //     .attr("class", "icon")
        //     .call(resize);
        elemtIndex++;
    }

}


// // Create Event Handlers for mouse
// function handleMouseOver(i) {  // Add interactivity
//
//     // Ignore the click event if it was suppressed
//     if (d3.event.defaultPrevented) return;
//
//     var object = d3.select(this);
//     // Use D3 to select element, change color
//     d3.select(this).style("fill", "orange");
//
//     console.log("rect (x:" + object.attr("x") + ", y:" + object.attr("y") + ")");
//
//     box.append("rect")
//        //.attr("transform", "translate(" + p.x + "," + p.y + ")")
//        .attr("x", object.attr("x") + w - iconsize)
//        .attr("y", object.attr("y") + h - iconsize)
//        .attr("width", iconsize)
//        .attr("height", iconsize)
//        .attr("fill", "#999999")
//        .attr("class", "icon")
//         .attr("id", "icon" + "-" + i) // Create an id for text so we can select it later for removing on mouseout
//        .call(resize);
// }
//
// function handleMouseOut(d, i) {
//
//     // Use D3 to select element, change color
//     d3.select(this).style("fill", "none");
//
//     // Select icon by id and then remove
//     d3.select("#icon" + "-" + i).remove();  // Remove text location
// }
//



// Define drag2move beavior
var drag2move = d3.behavior.drag()
    .on("drag", move);

function move(d) {
    var dragTarget = d3.select(this);
    var dragObject = d3.select(this.parentNode); //group
        console.log("dragTarget:" + dragTarget);

    var xx = d3.select(this).attr("cx");
    var yy = d3.select(this).attr("cy");

    //else if(this == SVGCircleElement)
    //{
        var x = d3.event.x;
        var y = d3.event.y;

        console.log("shape at: (xx:" + xx +" yy:" + yy + ")");
        console.log("mouse at: (.x:" + x+" .y:"+ y + ")");

        d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
    //}

}


var resize = d3.behavior.drag()
    .origin(function() {
        var current = d3.select(this);
        return {x: current.attr("x"), y: current.attr("y") };
    })
    .on("drag", dragResize);


// charts = box.selectAll("rects")
//
// box = charts.enter()
//     .append("g").classed("chart", true)
//     .attr("id", function(d,i) { return "box"+i})

var dx = 429;
var dy = 184;

// implenent resize event handler
function dragResize(){
	 var dragx = Math.max(dx + (iconsize/2), Math.min(w, dx + w + d3.event.dx));
	 var dragy = Math.max(dy + (iconsize/2), Math.min(h, dy + h + d3.event.dy));


	 var dragTarget = d3.select(this);
	 var dragObject = d3.select(this.parentNode);

     console.log("d3.event.x:"+d3.event.dx+" d3.event.y:"+d3.event.dy);
      //console.log(dragObject.attr("class")); // will print box
      console.log("dragTarget (x:" + dragTarget.attr("x") + ", y:" + + dragTarget.attr("y") + ")");
       console.log(dragObject.attr("class"));

	 var o = dragObject.select("rect.box");

	 var oldx = dx;
	 var oldy = dy;

	  dx = Math.max(0, Math.min(dx + w - (iconsize / 2), d3.event.x));
	  dy = Math.max(0, Math.min(dy + h - (iconsize / 2 ), d3.event.y));
	  w = w - (oldx - dx);
	  h = h - (oldy - dy);

	  dragTarget
		.attr("x", function(d) { return dragx - (iconsize/2) })
		.attr("y", function(d) { return dragy - (iconsize/2) })

	  o.attr("width", w)
	   .attr("height", h);

};
