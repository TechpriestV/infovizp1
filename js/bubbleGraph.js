//https://medium.freecodecamp.org/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46
// https://bl.ocks.org/dmesquita/37d8efdb3d854db8469af4679b8f984a
//https://bl.ocks.org/pbogden/854425acb57b4e5a4fdf4242c068a127

// function updateFilter(argument) {
//     console.log("hej2")

// }
function bubbleChart() {
    var width = 960,
        height = 960,
        mini = 1,
        maxi = 40,
        groupingForce = .5,
        columnForGroup = "Major",
        columnForRadius = "totalSkill",
        colorSet = d3.schemeCategory20c,
        padding = 1.1;

    

    function chart(selection) {
        function test(argument) {
            console.log("Hej")
        }
        var data = selection.enter().data(),
            div = selection,
            svg = div.selectAll('svg')
            button = div.selectAll('buttonDiv');

            

        svg.attr('width', width).attr('height', height);
        var counts = {};
        for (var i = 0; i < data.length; i++) {
            counts[data[i][columnForGroup]] = 1 + (counts[data[i][columnForGroup]] || 0);
        }
        var clusters = new Array(Object.keys(counts).length);
        
        data.forEach(function(d) {
            d["totalSkill"]=+d["Skill 1"] + 
                            +d["Skill 2"] + 
                            +d["Skill 3"] + 
                            +d["Skill 4"] + 
                            +d["Skill 5"] + 
                            +d["Skill 6"] + 
                            +d["Skill 7"] + 
                            +d["Skill 8"] + 
                            +d["Skill 9"] + 
                            +d["Skill 10"] + 
                            +d["Skill 11"] + 
                            +d["Skill 12"];
            d["radius"] = d[columnForRadius];
            // d["cluster"] = d[columnForGroup];


            if (!clusters[d[columnForGroup]] || (d.radius > clusters[d[columnForGroup]].radius)) clusters[d[columnForGroup]] = d;
        });
        var colorCircles = d3.scaleOrdinal(colorSet);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range([mini, maxi])

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "400px")
            .text("");

        var forceCollide = d3.forceCollide()
            .radius(function(d) { return scaleRadius(d.radius) + 2; })
            .iterations(1);


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength())
            .force("x", d3.forceX().strength(groupingForce))
            .force("y", d3.forceY().strength(groupingForce))
            .force("center", d3.forceCenter())
            .force("collide", forceCollide)
            .force("cluster", forceCluster)
            .on("tick", ticked);


        function ticked(e) {
            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        }

        function forceCluster(alpha) {
            for (var i = 0, n = data.length, node, cluster, k = alpha * 1; i < n; ++i) {
                node = data[i];
                cluster = clusters[node[columnForGroup]];
                node.vx -= (node.x - cluster.x) * k;
                node.vy -= (node.y - cluster.y) * k;
          }
        }

        
        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('r', function(d) {
                return scaleRadius(d[columnForRadius])
            })
            .style("fill", function(d) {
                return colorCircles(d[columnForGroup])
            })
            .attr("id", function(d) {
                return d.Alias;
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function(d) {
                tooltip.html("Alias: " + d.Alias + "<br>"
                            +"Skill:" + d.totalSkill +"<br>"
                            +columnForGroup +" " 
                            + d[columnForGroup]);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mousedown", function(d) {
                console.log(data.indexOf(d))
                // data.splice(data.indexOf(d))
                d3.selectAll("#"+d.Alias).remove();
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });
        
    }

    chart.columnForGroup = function(value) {
        if (!arguments.length) {
            return columnForGroup;
        }
        columnForGroup = value;
        return chart;
    }

    // chart.width = function(value) {
    //     if (!arguments.length) {
    //         return width;
    //     }
    //     width = value;
    //     return chart;
    // };

    // chart.height = function(value) {
    //     if (!arguments.length) {
    //         return height;
    //     }
    //     height = value;
    //     return chart;
    // };


    // chart.columnForGroup = function(value) {
    //     if (!arguments.columnForGroup) {
    //         return columnForGroup;
    //     }
    //     columnForGroup = value;
    //     return chart;
    // };

    // chart.columnForRadius = function(value) {
    //     if (!arguments.columnForRadius) {
    //         return columnForRadius;
    //     }
    //     columnForRadius = value;
    //     return chart;
    // };

    return chart;
}
