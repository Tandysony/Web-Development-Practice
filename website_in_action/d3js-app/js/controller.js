var boxWidth = 1000;
var boxHeight = 600;
var padding = 20;
var border = 3;
var bordercolor = 'black';

// Create the SVG box
var box = d3.select("#svgdock")
        .append("svg")
        .attr("class", "box")
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("border",border)
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
