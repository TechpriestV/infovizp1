d3.csv("data/realData.csv", function(error, data) {
    if(error){
      console.log("Data error");
      throw error;
    }
    data.forEach(function(d) {
        d["totalSkill"]= +d["Skill 1"] + +d["Skill 2"] + +d["Skill 3"] + +d["Skill 4"] + +d["Skill 5"] + +d["Skill 6"] + +d["Skill 7"] + +d["Skill 8"] + +d["Skill 9"] + +d["Skill 10"] + +d["Skill 11"] + +d["Skill 12"];
        
    });
    options = ["Major", "Degree"];


    d3.select("buttonDiv").selectAll("button")
        .data(options)
        .enter()
        .append("button")
        .attr("id", function(d) { return d;})
        .text(function(d) {return d;})
        .on("mousedown", function(d) {
            // columnForGroup = d;
            console.log(d)
            draw(d)
        })


    // console.log(data)
    function draw(filter) {
        $('svg').empty()
        var chart = bubbleChart().columnForGroup(filter);
        d3.select("#chart").data(data).call(chart);
    }
  });
function updateFilter(argument) {
    console.log("hej3")
    console.log(chart.updateFilter())
    
}