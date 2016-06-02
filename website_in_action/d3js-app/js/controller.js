var boxWidth = 1000;
var boxHeight = 600;
var padding = 20;
var border = 3;
var bordercolor = 'black';

var menu = {
				title: 'Item #1',
				action: function(elm, d, i) {
					console.log('Item #1 clicked!');
					console.log('The data for this circle is: ' + d);
				}
			}



// Create the SVG box with boarder
var box = d3.select("#svgdock")
        .append("svg")
        .attr("class", "box")
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("border",border)
        .on("mousemove", function () {
            var point = d3.mouse(this), p = {x: point[0], y: point[1] };
            TextX.value = d3.format("f")(p.x);
            TextY.value = d3.format("f")(p.y);
        })
        .on("click", click);

// Draw the board of the SVG box
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

  // Append a new point
  box.append("circle")
      .attr("transform", "translate(" + p.x + "," + p.y + ")")
      .attr("r", "30")
      .attr("class", "circles")
      //.on("contextmenu", munuHandler)
      .call(drag);
}

// Define drag beavior
var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}
