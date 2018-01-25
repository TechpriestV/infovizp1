d3.csv("data/realData.csv", function(error, data) {
    if(error){
      console.log("Data error");
      throw error;
    }
    data.forEach(function(d) {
        d["totalSkill"]= +d["Skill 1"] + +d["Skill 2"] + +d["Skill 3"] + +d["Skill 4"] + +d["Skill 5"] + +d["Skill 6"] + +d["Skill 7"] + +d["Skill 8"] + +d["Skill 9"] + +d["Skill 10"] + +d["Skill 11"] + +d["Skill 12"];
        
    });
    // console.log(data)
    var chart = bubbleChart();
    d3.select("#chart").data(data).call(chart);
  });