var boxWidth = 1000;
var boxHeight = 600;
var padding = 20;
var border = 3;
var bordercolor = 'black';


var box = d3.select("#svgdock")
        .append("svg")
        .attr("class", "box")
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("border",border);

box.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("stroke", bordercolor)
        .style("fill", "none")
        .style("stroke-width", border);



/* --------------------------------
 *      For circle shapes
*/

    //
    // // function to draw a circle
    // function drawCircle(x, y, size) {
    //     console.log('Drawing circle at', x, y, size);
    //     box.append("circle")
    //         .attr('class', 'draggableCircle')
    //         .attr("cx", x)
    //         .attr("cy", y)
    //         .attr("r", size)
    //         .call(drag)
    //         .style("stroke", "blue")
    //         .style("stroke-width", 2)
    //         .style("fill-opacity", .5)
    //         .style("fill", "white");
    //
    // }
    //
    // // draw a pre-defined circle on click.
    // box.on('click', function() {
    //     var coords = d3.mouse(this);
    //     console.log(coords);
    //     drawCircle(coords[0], coords[1], 50);
    // });



var drag = d3.behavior.drag()
        .on("drag", function () {
            g.selectAll("*")
                .attr("cx", d3.event.x)
                .attr("cy", d3.event.y);
        });

var resizeCircles = d3.behavior.drag()
        .on("drag", function () {
            g.selectAll(".resizingContainer")
                    .attr("r", function (c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5) + 4;
                    });
            g.selectAll(".circle")
                    .attr("r", function (c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
                    });
        });


var g = box.selectAll(".draggableCircle")
        .data([{
            x: 350,
            y: 55,
            r: 25
        }])
        .enter()
        .append("g")
        .attr("class", "draggableCircle");

g.append("circle")
        .attr("class", "resizingContainer")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return d.r + 4;
        })
        .style("stroke", "#999")
        .style("stroke-width", 6)
        .style("fill-opacity", .5)
        .style("fill", "none")
        .call(resizeCircles);

g.append("circle")
        .attr("class", "circle")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return d.r;
        })
        .call(drag)
        .style("stroke", "blue")
        .style("stroke-width", 2)
        .style("fill-opacity", .5)
        .style("fill", "white");




/* --------------------------------
 *      For rect shapes
*/

var distance = function (p1, p2) {
    return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
};

var resizeRect = d3.behavior.drag()
        .on("drag", function () {
            var c = g2.selectAll(".resizingSquare");
            var s = g2.selectAll(".square");

            var e = d3.event;
            var x = Number(this.attributes.x.value);
            var y = Number(this.attributes.y.value);
            var w = Number(this.attributes.width.value);
            var h = Number(this.attributes.height.value);
            var c1 = { x: x, y: y };
            var c2 = { x: x + w, y: y };
            var c3 = { x: x + w, y: y + h };
            var c4 = { x: x, y: y + h };

            // figure out which corner this is closest to
            var d = [];
            var m1 = distance(e, c1);
            var m2 = distance(e, c2);
            var m3 = distance(e, c3);
            var m4 = distance(e, c4);
            switch (Math.min(m1, m2, m3, m4)) {
                case m3:
                    c
                        .attr("width", function () { return w + (e.x - c3.x) + 8; })
                        .attr("height", function () { return h + (e.y - c3.y) + 8; });
                    s
                        .attr("width", function () { return w + (e.x - c3.x); })
                        .attr("height", function () { return h + (e.y - c3.y); });
                    break;
            }
        });



var g2 = box.selectAll(".draggableSquare")
    .data([{
        x: 600,
        y: 400,
        width: 100,
        height: 70
    }])
    .enter()
    .append("g")
    .attr("class", "draggableSquare");


// resizeable rectangle
    g2.append("rect")
        .attr("class", "resizingSquare")
        .attr("width", function (d) {
            return d.width + 8;
        })
        .attr("height", function (d) {
            return d.height + 8;
        })
        .attr("x", function (d) {
            return d.x - 4;
        })
        .attr("y", function (d) {
            return d.y - 4;
        })
        .style("stroke", "#999")
        .style("stroke-width", 6)
        .style("fill-opacity", .5)
        .style("fill", "none")
        .call(resizeRect);


    g2.append("rect")
        .attr("class", "square")
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .call(drag)
        .style("stroke", "blue")
        .style("stroke-width", 2)
        .style("fill-opacity", .5)
        .style("fill", "white");
