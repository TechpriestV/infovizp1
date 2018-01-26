//https://medium.freecodecamp.org/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46
// https://bl.ocks.org/dmesquita/37d8efdb3d854db8469af4679b8f984a
//https://bl.ocks.org/pbogden/854425acb57b4e5a4fdf4242c068a127


function bubbleChart() {
    var width = 960,
        height = 960,
        mini = 1,
        maxi = 40,
        groupingForce = .5,
        columnForGroup = "Major",
        columnForRadius = "totalSkill",
        skills = ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8", "Skill 9", "Skill 10", "Skill 11", "Skill 12"],
        colorSet = d3.schemeCategory20c,
        padding = 1.1;

    

    function chart(selection) {

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
            d["totalSkill"] = 0;
            for (var i = 0; i < skills.length; i++) {
                d["totalSkill"] += +d[skills[i]];
            }
            d["radius"] = d[columnForRadius];


            if (!clusters[d[columnForGroup]] || (d.radius > clusters[d[columnForGroup]].radius)) clusters[d[columnForGroup]] = d;
        });
        var colorCircles = d3.scaleOrdinal(colorSet);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range([mini, maxi]);

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
        };

        function forceCluster(alpha) {
            for (var i = 0, n = data.length, node, cluster, k = alpha * 1; i < n; ++i) {
                node = data[i];
                cluster = clusters[node[columnForGroup]];
                node.vx -= (node.x - cluster.x) * k;
                node.vy -= (node.y - cluster.y) * k;
          };
        };

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
                            + d[columnForGroup] + "<br>"
                            + "Interests: " + d.Hobbies);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("click", function(d, i) {
                console.log(d, i)
                // removeCircle(d.Alias)
                // data.splice(i, 1)
                // node.exit().remove()
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });
        function removeCircle(id) {
            // console.log(svg.selectAll("Gellert Grindelwald").remove())
            // $('#'+id).empty()
            // console.log($('#'+id))
            // console.log(node)
            // node.remove()
            // console.log("Hej")
            // node.exit().remove()
        }
    };

    chart.columnForGroup = function(value) {
        if (!arguments.length) {
            return columnForGroup;
        }
        columnForGroup = value;
        return chart;
    };
    chart.skills = function(value) {
        if(!arguments.length){
            return skills;
        }
        skills = value;
        return skills;
    };

    return chart;
}
